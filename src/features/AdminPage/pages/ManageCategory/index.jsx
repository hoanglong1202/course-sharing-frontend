import React from 'react';
import { Box, Typography } from '@mui/material';
import useStyles from '../../styles';

ManageCategory.propTypes = {};

function ManageCategory(props) {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.title}>Quản lý danh mục</Typography>
      <Typography className={classes.description}>
        Đây là nơi quản lý danh mục ở Website
        <b>Course Sharing</b>
      </Typography>
    </Box>
  );
}

export default ManageCategory;
