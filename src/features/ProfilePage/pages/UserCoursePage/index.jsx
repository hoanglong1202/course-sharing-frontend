import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import SmallCourseCard from 'components/SmallCourseCard';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useStyles from '../../styles';

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
      <Grid container spacing={2}>
        {!loading &&
          history.map((item, index) => (
            <Grid item md={6} lg={3} key={index}>
              <SmallCourseCard item={item} />
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={2}>
        {!loading &&
          favourite.map((item, index) => (
            <Grid item md={6} lg={3} key={index}>
              <SmallCourseCard item={item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default CoursePage;
