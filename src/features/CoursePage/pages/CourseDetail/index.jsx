import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  Avatar,
  Breadcrumbs,
  Button,
  Grid,
  LinearProgress,
  Link,
  Rating,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import userApi from 'api/userApi';
import phongcanh3 from 'assets/images/phongcanh3.jpeg';
import Test from 'assets/images/phongcanh3.jpeg';
import clsx from 'clsx';
import { openDialog } from 'features/Auth/authSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from './components/Comments';
import WriteComments from './components/WriteComments';
import useStyles from './styles';

CourseDetail.propTypes = {};

function CourseDetail(props) {
  const classes = useStyles();
  let { courseId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const { pathname } = useLocation();
  const { current: currentUser, openDialog: open } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [isFavourited, setIsFavourited] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isRegister, setIsRegister] = useState(false);

  const auth = currentUser.id ? true : false;
  const isReviewed = commentList.findIndex(
    (item) => item.id === currentUser.id
  );

  const handleNavigate = async () => {
    if (auth && currentUser.role === 'user') {
      await courseApi.addCourseRegister(courseId, currentUser.id);
    }

    if (!auth && course.max_user && parseInt(course.max_user) > 0) {
      dispatch(openDialog());
      return;
    }
    navigate(`/course/${course.id}/${course.firstLesson.id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        await courseApi.countCourseViewed(courseId);
        const { dataObj } = await courseApi.getCourse(courseId);
        const { dataObj: list } = await courseApi.getCourseRating(courseId);

        setCourse(dataObj);
        setCommentList(list);
        if (auth && currentUser.role === 'user') {
          const { dataObj: userFavourite } = await userApi.getUserFavourite(
            currentUser.id
          );

          if (userFavourite && Object.keys(userFavourite).length !== 0) {
            const isFavour =
              userFavourite.findIndex(
                (item) => item.courseId === parseInt(courseId)
              ) !== -1;

            setIsFavourited(isFavour);
          }

          if (course.max_user && parseInt(course.max_user) > 0) {
            const {
              dataObj: { totalView, user: userRegister },
            } = await courseApi.getCourseRegister(courseId);

            const isLocked = parseInt(course.max_user) <= parseInt(totalView) && !userRegister.find(x => parseInt(x.userId) === parseInt(currentUser.id));
            setIsRegister(isLocked);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log('Some error occur: ', error);
      }
    })();
  }, [courseId, currentUser.id, auth, currentUser.role, course.max_user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFavouriteButton = async () => {
    try {
      let result;
      if (!auth && !open) {
        dispatch(openDialog());
      }

      if (!isFavourited && currentUser.role === 'user') {
        result = await userApi.addUserFavourite(courseId, currentUser.id);

        if (result.success) {
          enqueueSnackbar('Add Favourite successful!', { variant: 'success' });
        }
      }

      if (isFavourited && currentUser.role === 'user') {
        result = await userApi.removeUserFavourite(courseId, currentUser.id);

        if (result.success) {
          enqueueSnackbar('Unfavourite successful!', { variant: 'success' });
        }
      }

      // refresh status
      if (result && result.success) {
        const { dataObj: userFavourite } = await userApi.getUserFavourite(
          currentUser.id
        );

        if (userFavourite && Object.keys(userFavourite).length !== 0) {
          const isFavour =
            userFavourite.findIndex(
              (item) => item.courseId === parseInt(courseId)
            ) !== -1;

          setIsFavourited(isFavour);
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleWriteComment = async (data) => {
    try {
      if (auth && currentUser.role === 'user') {
        const ratingData = {
          ...data,
          courseId,
          userId: currentUser.id,
        };

        const result = await courseApi.addCourseRating(ratingData);

        if (result.success) {
          enqueueSnackbar('Review successful!', { variant: 'success' });

          // refresh comment
          const { dataObj: list } = await courseApi.getCourseRating(courseId);
          setCommentList(list);
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  if (loading) {
    return <LinearProgress />;
  }


  return (
    <Box className={classes.root}>
      <Box className={classes.titleBackground} />

      <Box className={classes.titleContainer}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <Box className={classes.itemCover}>
              <Breadcrumbs
                separator={
                  <NavigateNextIcon className={classes.icon} fontSize="small" />
                }
              >
                <Link underline="hover" className={classes.breadcumb} href="/">
                  Trang chủ
                </Link>
                <Typography className={classes.breadcumb}>Khóa học</Typography>
              </Breadcrumbs>
              <Typography className={classes.courseTitle} variant="h1">
                {course?.course_name}
              </Typography>
              <Typography className={classes.courseDecription} variant="body2">
                {course?.description}
              </Typography>
              <Box className={classes.iconContainer}>
                <Box className={classes.iconHolder}>
                  <FavoriteIcon style={{ color: 'rgb(255 76 106)' }} />
                  <span className={classes.score}>
                    <CountUp duration={3} end={course?.favourited} />
                  </span>
                </Box>

                <Box className={classes.iconHolder}>
                  <RemoveRedEyeIcon style={{ color: '#CEC0FC' }} />
                  <span className={classes.score}>
                    <CountUp duration={3} end={course?.viewed} />
                  </span>
                </Box>

                {!loading && (
                  <Box className={classes.iconHolder}>
                    <Rating
                      value={course?.point}
                      precision={0.5}
                      readOnly
                      style={{ color: '#ffbc00' }}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                    <span className={classes.score}>{course?.point}</span>
                  </Box>
                )}
              </Box>
              <Typography mt={1}>Tác giả:</Typography>
              <Box className={classes.authorContainer}>
                <Avatar
                  className={classes.authorAvatar}
                  alt={course?.creator_name}
                  src={
                    course?.profile_picture
                      ? `${process.env.REACT_APP_STATIC_PUBLIC}${course?.profile_picture}`
                      : Test
                  }
                />
                <Box className={classes.authorHolder}>
                  <Typography
                    className={clsx(
                      classes.authorDescription,
                      classes.authorTitle
                    )}
                  >
                    {course?.creator_name}
                  </Typography>
                  <Typography className={classes.authorDescription}>
                    {course?.creator_description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} className={classes.courseLearnGrid}>
            <Box className={classes.courseLearn}>
              <img
                className={classes.courseCover}
                src={
                  course?.cover_picture
                    ? `${process.env.REACT_APP_STATIC_PUBLIC}${course?.cover_picture}`
                    : phongcanh3
                }
                alt="tét"
              />
              <Box className={classes.buttonContainer}>
                <Button
                  onClick={handleNavigate}
                  className={classes.learnButton}
                  disabled={isRegister}
                >
                  {!isRegister ? `Học ngay` : `Đến giới hạn`}
                </Button>
                <Button
                  className={classes.loveButton}
                  onClick={handleFavouriteButton}
                  disabled={
                    currentUser.role === 'creator' ||
                    currentUser.role === 'admin'
                  }
                >
                  {isFavourited ? (
                    <>
                      <FavoriteIcon style={{ color: 'rgb(255 76 106)' }} />
                      &nbsp;Đã thích
                    </>
                  ) : (
                    <>
                      <FavoriteBorderIcon
                        style={{ color: 'rgb(255 76 106)' }}
                      />
                      &nbsp;Yêu thích
                    </>
                  )}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.content}>
        <Typography className={classes.contentTitle}>
          Bạn sẽ học được gì ở khóa này:
        </Typography>

        <Box className={classes.contentInfor}>
          <CheckIcon />
          <Typography className={classes.infor}>
            Truy cập các khóa học hoàn toàn miễn phí
          </Typography>
        </Box>

        <Box className={classes.contentInfor}>
          <CheckIcon />
          <Typography className={classes.infor}>
            Hơn <CountUp duration={3} end={course?.total} /> bài học được chia
            sẻ từ lập trình viên hàng đầu
          </Typography>
        </Box>

        <Box className={classes.contentInfor}>
          <CheckIcon />
          <Typography className={classes.infor}>
            Hơn <CountUp duration={3} end={course?.viewed} /> học viên đã tham
            gia và hơn <CountUp duration={3} end={course?.favourited} /> người
            yêu thích khóa học này
          </Typography>
        </Box>
      </Box>

      <Box mt={3} mb={3} ml={2}>
        <Typography className={classes.contentTitle}>
          Đánh giá từ học viên:
        </Typography>
      </Box>

      {isReviewed === -1 && <WriteComments onSubmit={handleWriteComment} />}

      {auth && isReviewed !== -1 && <p>Bạn đã đánh giá khóa học này</p>}

      {!loading && commentList.length > 0 ? (
        commentList.map((item, index) => <Comment key={index} item={item} />)
      ) : (
        <p>Khóa học này chưa có nhận xét nào</p>
      )}
    </Box>
  );
}

export default CourseDetail;
