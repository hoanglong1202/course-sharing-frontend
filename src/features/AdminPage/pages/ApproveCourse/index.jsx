import { Box, Typography } from '@mui/material';
import React from 'react';
import useStyles from '../../styles';

ApproveCourse.propTypes = {};

function ApproveCourse(props) {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.title}>Phê duyệt khóa học</Typography>
      <Typography className={classes.description}>
        Đây là nơi phê duyệt khóa học ở Website
        <b>Course Sharing</b>
      </Typography>
    </Box>
  );
}

export default ApproveCourse;
