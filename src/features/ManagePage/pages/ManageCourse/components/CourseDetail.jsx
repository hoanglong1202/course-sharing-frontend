import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import useStyles from '../styles';
import { Button, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import { useParams } from 'react-router-dom';
import moment from 'moment';

CourseDetail.propTypes = {};

function CourseDetail(props) {
  const { id } = useParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [lessonList, setLessonList] = useState([]);
  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getCourse(id);

      setCourse(dataObj);
      setLessonList(dataObj?.lessonList);
    })();

    setLoading(false);
  }, []);

  const handleDetailButton = (id) => {
    return alert(id);
  };

  const handleDeleteButton = (id) => {
    return alert(id);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'lesson_name',
      headerName: 'Tên bài học',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      width: 400,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'content',
      headerName: 'Link',
      width: 380,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'lesson_types_name',
      headerName: 'Loại bài học',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteButton(params.id)}
        />,
        <GridActionsCellItem
          icon={<BrightnessLowIcon />}
          label="Cập nhập bài học"
          onClick={() => handleDetailButton(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Typography className={classes.title}>
        Chi tiết khóa học {course.course_name}
      </Typography>
      <Typography className={classes.description}>
        {course.description}
      </Typography>

      <Box mb={2} ml={1}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            Tên khóa học
          </Grid>
          <Grid item xs={12} sm={6}>
            {course?.course_name}
          </Grid>

          <Grid item xs={12} sm={6}>
            Miêu tả
          </Grid>
          <Grid item xs={12} sm={6}>
            {course?.description}
          </Grid>

          <Grid item xs={12} sm={6}>
            Trạng thái
          </Grid>
          <Grid item xs={12} sm={6}>
            {!course?.approved_date
              ? 'Chưa phê duyệt'
              : `${moment(course?.approved_date).format('DD-MM-YYYY')}`}
          </Grid>

          <Grid item xs={12} sm={6}>
            Giới hạn người dùng
          </Grid>
          <Grid item xs={12} sm={6}>
            {course?.max_user === 0 || !course?.max_user
              ? 'Không giới hạn'
              : `${parseInt(course?.max_user)} người dùng`}
          </Grid>

          <Grid item xs={12} sm={6}>
            Số lượng bài học
          </Grid>
          <Grid item xs={12} sm={6}>
            {course?.lessonList?.length}
          </Grid>
        </Grid>
      </Box>
      <Box style={{ height: 400, width: '100%' }}>
        <DataGrid rows={lessonList} columns={columns} />
      </Box>
    </Box>
  );
}

export default CourseDetail;
