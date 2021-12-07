import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import useStyles from '../styles';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import { useNavigate } from 'react-router-dom';

CourseList.propTypes = {};

function CourseList(props) {
  const classes = useStyles();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getCourseList(1);

      setCourseList(dataObj);
    })();

    setLoading(false);
  }, []);

  const handleDetailButton = (id) => {
    navigate(`/manage/course/${id}`)
    // return alert(id);
  };

  const handleUpdateButton = (id) => {
    navigate(`/manage/course/update-course/${id}`)
    // return alert(id);
  };

  const handleDeleteButton = (id) => {
    return alert(id);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'course_name',
      headerName: 'Tên khóa học',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    // { field: 'description', headerName: 'Miêu tả', width: 150 },

    {
      field: 'viewed',
      headerName: 'Lượt xem',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'favourited',
      headerName: 'Lượt yêu thích',
      width: 120,
      headerAlign: 'center',
      align: 'center',
    },

    // { field: 'creator_id', headerName: 'Creator ID', width: 100 },
    // { field: 'admin_id', headerName: 'Admin ID', width: 100 },

    {
      field: 'approved_date',
      headerName: 'Ngày phê duyệt',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.value || 'Chưa phê duyệt';
      },
    },
    {
      field: 'max_user',
      headerName: 'Giới hạn',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.value && parseInt(params.value) > 0
          ? params.value
          : 'Không';
      },
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
          icon={<AnalyticsIcon />}
          label="Xem chi tiết"
          onClick={() => handleDetailButton(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<BrightnessLowIcon />}
          label="Cập nhập khóa học"
          onClick={() => handleUpdateButton(params.id)}
          showInMenu
        />,
      ],
    },
    // { field: 'register_link', headerName: 'Link đăng ký', width: 150 },
  ];

  return (
    <Box>
      <Typography className={classes.title}>Khóa học của bạn</Typography>
      <Typography className={classes.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
        possimus architecto sed ab
      </Typography>
      <Box style={{ height: 400, width: '100%' }}>
        <DataGrid rows={courseList} columns={columns} />
      </Box>
    </Box>
  );
}

export default CourseList;
