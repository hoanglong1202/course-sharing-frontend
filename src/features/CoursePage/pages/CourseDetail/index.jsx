import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import phongcanh3 from 'assets/images/phongcanh3.jpeg';
import Test from 'assets/images/test.jpg';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Comments from './components/Comments';
import useStyles from './styles';
import CountUp from 'react-countup';

CourseDetail.propTypes = {};

function CourseDetail(props) {
  const classes = useStyles();
  let { courseId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});

  const handleNavigate = () => {
    navigate(`/course/${course.id}/${course.firstLesson.id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        await courseApi.countCourseViewed(courseId);
        const { dataObj } = await courseApi.getCourse(courseId);
        
        setCourse(dataObj);
      } catch (error) {
        console.log('Some error occur: ', error);
      }
    })();

    setLoading(false);
  }, [courseId]);

  console.log(course);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

                <Box className={classes.iconHolder}>
                  <Rating
                    value={4.5}
                    precision={0.5}
                    readOnly
                    style={{ color: '#ffbc00' }}
                    // onChange={(event, newValue) => {
                    //   setValue(newValue);
                    // }}
                  />
                  <span className={classes.score}>4.5</span>
                </Box>
              </Box>
              <Typography mt={1}>Created by:</Typography>
              <Box className={classes.authorContainer}>
                <Avatar
                  className={classes.authorAvatar}
                  alt="Remy Sharp"
                  src={Test}
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
              <img className={classes.courseCover} src={phongcanh3} alt="tét" />
              <Box className={classes.buttonContainer}>
                <Button
                  onClick={handleNavigate}
                  className={classes.learnButton}
                >
                  Học ngay
                </Button>
                <Button className={classes.loveButton}>
                  <FavoriteIcon style={{ color: 'rgb(255 76 106)' }} />
                  &nbsp;Yêu thích
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.content}>
        <Typography className={classes.contentTitle}>
          Bạn sẽ học được gì ở khóa này: {courseId}
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
            Hơn <CountUp duration={3} end={course?.total} /> bài học được chia sẻ từ lập trình viên hàng đầu
          </Typography>
        </Box>

        <Box className={classes.contentInfor}>
          <CheckIcon />
          <Typography className={classes.infor}>
            Hơn <CountUp duration={3} end={course?.viewed} /> học viên đã tham gia và hơn <CountUp duration={3} end={course?.favourited} /> người yêu thích khóa học này
          </Typography>
        </Box>

        <Box className={classes.contentInfor}>
          <CheckIcon />
          <Typography className={classes.infor}>
            Learn to create Machine Learning Algorithms in Python. Master
            Machine Learning on Python & R
          </Typography>
        </Box>

        <Box className={classes.contentInfor}>
          <CheckIcon />
          <Typography className={classes.infor}>
            Master Machine Learning on Python & R Handle advanced techniques
            like Dimensionality Reduction
          </Typography>
        </Box>

        <Box className={classes.contentInfor}>
          <CheckIcon />
          <Typography className={classes.infor}>
            Build an army of powerful Machine Learning models and know how to
            combine them to solve any problem
          </Typography>
        </Box>
      </Box>

      <Comments />
    </Box>
  );
}

export default CourseDetail;
