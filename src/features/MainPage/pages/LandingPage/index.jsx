import { Grid, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import userApi from 'api/userApi';
import DesignIllustration from 'assets/images/design-illustration-2.svg';
import UDN from 'assets/images/UDN.jpg';
import UTE from 'assets/images/UTE.png';
import clsx from 'clsx';
import Can from 'components/Can';
import SmallCourseCard from 'components/SmallCourseCard';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import useStyles from '../../styles';

function LandingPage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    current: { id, role },
  } = useSelector((state) => state.auth);

  const [course, setCourse] = useState({
    favouritedCourse: [],
    viewedCourse: [],
    courses: [],
  });
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [pagination, setPagination] = useState(0);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      page: params.page || 1,
      limit: params.limit || 6,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const { dataObj, pagination } = await courseApi.getAllCourse(
          queryParams
        );

        setCourse(dataObj);
        setPagination(pagination);

        if (role === 'user') {
          const { dataObj } = await userApi.getUserHistoryList(id);
          const { dataObj: favouriteList } = await userApi.getUserFavourite(id);

          setHistory(dataObj.slice(0, 4));
          setFavourite(favouriteList.slice(0, 4));
        }
        setLoading(false);
      } catch (error) {
        console.log('Some error occur: ', error);
      }
    })();
  }, [id, role, queryParams]);

  const handlePageChange = (e, page) => {
    const filter = {
      ...queryParams,
      page: page,
    };

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={0} pb={'96px'}>
        <Grid item xs={12} md={5}>
          <Box className={classes.titleBox}>
            <Typography className={classes.title}>
              Nơi chia sẻ khóa học lập trình {` `}
              <span className={clsx(classes.title, classes.strong)}>
                miễn phí
              </span>
            </Typography>
            <Typography className={classes.description}>
              Điểm đến dành cho những người có niềm đam mê và nhu cầu dễ dàng tiếp cận các khóa học lập trình
              đồng thời là nơi chia sẻ các kiến thức về lập trình dành cho các bạn sinh viên UTE.
            </Typography>

            <Box className={classes.customerContainer}>
              <Typography className={classes.customerTitle}>
                SẢN PHẨM ĐỒ ÁN THUỘC
              </Typography>
              <Box className={classes.logoContainer}>
                <img src={UDN} alt="UDN" className={classes.logo} />
                <img src={UTE} alt="UTE" className={classes.logo} />
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box>
            <img className={classes.image} src={DesignIllustration} alt="gg" />
          </Box>
        </Grid>
      </Grid>

      {!loading && history.length > 0 && (
        <Can roles={["user"]}>
          <Box className={classes.sectionContainer}>
            <span className={classes.features}>Khóa học vừa xem</span>
          </Box>
          <Grid container spacing={2}>
            {history.map((item, index) => (
              <Grid item md={6} lg={3} key={index}>
                <SmallCourseCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Can>
      )}

      {!loading && favourite.length > 0 && (
        <Can roles={["user"]}>
          <Box className={classes.sectionContainer}>
            <span className={classes.features}>Khóa học yêu thích</span>
          </Box>
          <Grid container spacing={2}>
            {favourite.map((item, index) => (
              <Grid item md={6} lg={3} key={index}>
                <SmallCourseCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Can>
      )}

      <Box className={classes.sectionContainer}>
        <span className={classes.features}>Xem nhiều nhất</span>
        <Typography variant="h2" className={classes.title}>
          Khóa học{' '}
          <span className={clsx(classes.title, classes.strong)}>
            xem nhiều nhất
          </span>
        </Typography>
      </Box>

      <Box mt={5} mb={10}>
        <Grid container spacing={3} className={classes.courseContainer}>
          {!loading &&
            course.favouritedCourse.map((item) => (
              <Grid item key={item.id}>
                <CourseCard item={item} />
              </Grid>
            ))}
        </Grid>
      </Box>

      <Box className={classes.sectionContainer}>
        <span className={classes.features}>Yêu thích nhất</span>
        <Typography variant="h2" className={classes.title}>
          Khóa học{' '}
          <span className={clsx(classes.title, classes.strong)}>
            yêu thích nhất
          </span>
        </Typography>
      </Box>

      <Box mt={5} mb={10}>
        <Grid container spacing={3} className={classes.courseContainer}>
          {!loading &&
            course.viewedCourse.map((item) => (
              <Grid item key={item.id}>
                <CourseCard item={item} />
              </Grid>
            ))}
        </Grid>
      </Box>

      <Box className={classes.sectionContainer}>
        <span className={classes.features}>Toàn bộ khóa học</span>
      </Box>

      <Box mt={3} mb={2}>
        <Box mt={3}>
          <Grid container spacing={3} className={classes.courseContainer}>
            {!loading &&
              course.courses.map((item) => (
                <Grid item key={item.id}>
                  <CourseCard item={item} />
                </Grid>
              ))}
          </Grid>
        </Box>
        {!loading && (
          <Box mt={3} className={classes.pagination}>
            <Pagination
              count={Math.round(pagination.total / pagination.limit) || 0}
              color="primary"
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default LandingPage;
