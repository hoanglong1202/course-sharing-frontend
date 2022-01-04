import {
  Avatar,
  Grid,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import userApi from 'api/userApi';
import Test from 'assets/images/phongcanh3.jpeg';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Comments from './components/Comments';
import WriteComments from './components/WriteComments';
import useStyles from './styles';

LessonDetail.propTypes = {};

function LessonDetail(props) {
  const classes = useStyles();
  let { courseId, lessonId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { current: currentUser } = useSelector((state) => state.auth);

  const lessonIndex = parseInt(lessonId);

  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState({});
  const [creator, setCreator] = useState({});
  const [lessonList, setLessonList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [lessonHistory, setLessonHistory] = useState([]);

  const auth = currentUser.id ? true : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleListItemClick = (event, id) => {
    navigate(`/course/${courseId}/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { dataObj } = await courseApi.getLessonDetail(courseId, lessonId);

        const { dataObj: commentList } = await courseApi.getLessonComment(
          courseId,
          lessonId
        );

        setLesson(dataObj);
        setCommentList(commentList);

        if (auth && currentUser.role === 'user') {
          await userApi.addUserHistory({
            courseId: parseInt(courseId),
            lessonId: parseInt(lessonId),
            userId: parseInt(currentUser.id),
          });

          const { dataObj: temp } = await courseApi.getUserLessonHistory(
            courseId,
            currentUser.id
          );
          setLessonHistory(temp);
        }
      } catch (error) {
        console.log('Some error occur: ', error);
      }
    })();

    setLoading(false);
  }, [auth, courseId, currentUser.id, currentUser.role, lessonId]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { dataObj, creator } = await courseApi.getLessons(courseId);

        setLessonList(dataObj);
        setCreator(creator);
      } catch (error) {
        console.log('Some error occur: ', error);
      }
    })();

    setLoading(false);
  }, [courseId]);

  const handleWriteComment = async (values) => {
    try {
      if (auth) {
        const data = {
          courseId,
          lessonId,
          username: currentUser.username,
          content: values,
          isCreator:
            currentUser.role === 'creator' &&
            creator.creator_id === currentUser.id
              ? 'true'
              : 'false',
        };
        const result = await courseApi.addLessonComment(data);

        if (result.success) {
          enqueueSnackbar('Comment successful!', { variant: 'success' });

          // refresh comment
          const { dataObj: commentList } = await courseApi.getLessonComment(
            courseId,
            lessonId
          );
          setCommentList(commentList);
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  let filtered = [];
  if (lessonHistory.length > 0) {
    filtered = lessonList.map((item) => {
      const index = lessonHistory.find(
        (x) => parseInt(x.lessonId) === parseInt(item.id)
      );
      if (index) {
        return {
          ...item,
          isWatched: true,
        };
      }

      return {
        ...item,
        isWatched: false,
      };
    });
  } else {
    filtered = lessonList;
  }

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Box className={classes.titleBackground} />
      <Box className={classes.titleContainer}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <iframe
              className={classes.mediaContainer}
              src={lesson.content}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className={classes.chapterContainer}>
              <List component="nav" aria-label="secondary mailbox folder">
                {!loading &&
                  filtered.map((item, index) => (
                    <ListItemButton
                      className={clsx(
                        classes.chapterButton,
                        item.id === lessonIndex && classes.chapterButtonActive
                      )}
                      selected={item.id === lessonIndex}
                      key={index}
                      onClick={(event) => handleListItemClick(event, item.id)}
                    >
                      <Typography
                        className={clsx(
                          classes.chapterTitle,
                          item.isWatched && classes.chapterTitleSeen,
                          item.id === lessonIndex && classes.chapterTitleActive
                        )}
                      >
                        {item.lesson_name}
                      </Typography>
                    </ListItemButton>
                  ))}
              </List>
            </Box>
          </Grid>
        </Grid>
        <Typography className={classes.courseTitle} variant="h1">
          {lesson.lesson_name}
        </Typography>
        <Typography variant="p" className={classes.courseDescription}>
          {lesson.description}
        </Typography>
      </Box>

      <Box className={classes.authorContainer}>
        <Avatar
          className={classes.authorAvatar}
          alt={creator?.creator_name}
          src={
            creator?.profile_picture
              ? `${process.env.REACT_APP_STATIC_PUBLIC}${creator?.profile_picture}`
              : Test
          }
        />
        <Box className={classes.authorHolder}>
          <Typography
            className={clsx(classes.authorDescription, classes.authorTitle)}
          >
            {creator?.creator_name}
          </Typography>
          <Typography className={classes.authorDescription}>
            {creator?.description}
          </Typography>
        </Box>
      </Box>

      <WriteComments onSubmit={handleWriteComment} />

      {!loading && commentList.length > 0 ? (
        commentList.map((item, index) => <Comments key={index} item={item} />)
      ) : (
        <p>Khóa học này chưa có nhận xét nào</p>
      )}
    </Box>
  );
}

export default LessonDetail;
