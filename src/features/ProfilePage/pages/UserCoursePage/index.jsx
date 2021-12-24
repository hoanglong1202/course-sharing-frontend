import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import SmallCourseCard from 'components/SmallCourseCard';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useStyles from '../../styles';
import HorizontalCourseCard from './components/HorizontalCourseCard';

CoursePage.propTypes = {};

function CoursePage(props) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const classes = useStyles();

  const {
    current: { id, role },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (role === 'user') {
        const { dataObj } = await userApi.getUserHistoryList(id);
        const { dataObj: favouriteList } = await userApi.getUserFavourite(id);

        setHistory(dataObj);
        setFavourite(favouriteList);
        setLoading(false);
      }
    })();
  }, [id, role]);

  return (
    <Box>
      <Box className={classes.sectionContainer}>
        <span className={classes.features}>Khóa học vừa xem</span>
      </Box>
      <Box className={classes.userHistoryWrapper}>
        {!loading &&
          history.map((item, index) => <HorizontalCourseCard item={item} />)}
      </Box>

      <Box className={classes.sectionContainer}>
        <span className={classes.features}>Khóa học yêu thích</span>
      </Box>
      <Box className={classes.userHistoryWrapper}>
        {!loading &&
          favourite.map((item, index) => <HorizontalCourseCard item={item} />)}
      </Box>
    </Box>
  );
}

export default CoursePage;
