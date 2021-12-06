import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useStyles from '../styles';
import { Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 20 },
  { field: 'course_name', headerName: 'Tên khóa học', width: 200 },
  // { field: 'description', headerName: 'Miêu tả', width: 150 },

  { field: 'viewed', headerName: 'Lượt xem', width: 100 },
  { field: 'favourited', headerName: 'Lượt yêu thích', width: 120 },

  { field: 'creator_id', headerName: 'Creator ID', width: 100 },
  { field: 'admin_id', headerName: 'Admin ID', width: 100 },

  { field: 'approved_date', headerName: 'Ngày phê duyệt', width: 150 },
  { field: 'max_user', headerName: 'Giới hạn', width: 150 },
  // { field: 'register_link', headerName: 'Link đăng ký', width: 150 },
];

CourseList.propTypes = {};

function CourseList(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getCourseList(1);

      setCourseList(dataObj);
    })();

    setLoading(false);
  }, []);

  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  return (
    <Box>
      <Typography className={classes.title}>Khóa học của bạn</Typography>
      <Typography className={classes.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
        possimus architecto sed ab
      </Typography>
      <Box style={{ height: 300, width: '100%' }}>
        <DataGrid rows={courseList} columns={columns} />
      </Box>
    </Box>
  );
}

export default CourseList;
