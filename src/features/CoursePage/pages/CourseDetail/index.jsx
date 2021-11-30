import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import {
  Avatar,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Rating,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import phongcanh3 from 'assets/images/phongcanh3.jpeg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Test from 'assets/images/test.jpg';
import CheckIcon from '@mui/icons-material/Check';
import useStyles from './styles';
import clsx from 'clsx';
import Comments from './components/Comments';

CourseDetail.propTypes = {};

function CourseDetail(props) {
  const classes = useStyles();
  let { courseId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = () => {
    navigate(`/course/123ab/abcd`);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
                Machine Learning A-Z™: Hands-On Python & R In Data Science
              </Typography>
              <Typography className={classes.courseDecription} variant="body2">
                Learn to create Machine Learning Algorithms in Python and R from
                two Data Science experts. Code templates included.
              </Typography>
              <Box className={classes.iconContainer}>
                <Box className={classes.iconHolder}>
                  <FavoriteIcon style={{ color: 'rgb(255 76 106)' }} />
                  <span className={classes.score}>45</span>
                </Box>

                <Box className={classes.iconHolder}>
                  <RemoveRedEyeIcon style={{ color: '#CEC0FC' }} />
                  <span className={classes.score}>55</span>
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
                    Easy Frontend
                  </Typography>
                  <Typography className={classes.authorDescription}>
                    Senior tại NCC Soft
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} className={classes.courseLearnGrid}>
            <Box className={classes.courseLearn}>
              <img className={classes.courseCover} src={phongcanh3} alt="tét" />
              <Box className={classes.buttonContainer}>
                <Button onClick={handleNavigate} className={classes.learnButton}>Học ngay</Button>
                <Button className={classes.loveButton}>
                  {' '}
                  <FavoriteIcon style={{ color: 'rgb(255 76 106)' }} />
                  Yêu thích
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
            20 Bài học được chia sẻ từ lập trình viên hàng đầu
          </Typography>
        </Box>

        <Box className={classes.contentInfor}>
          <CheckIcon />
          <Typography className={classes.infor}>
            Hơn 55 học viên đã tham gia và hơn 30 người yêu thích khóa học này
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
