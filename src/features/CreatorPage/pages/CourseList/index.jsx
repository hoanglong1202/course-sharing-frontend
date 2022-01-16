import AnalyticsIcon from '@mui/icons-material/Analytics';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import courseApi from 'api/courseApi';
import ConfirmDialog from 'components/ConfirmDialog';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from '../../styles';

CourseList.propTypes = {};

function CourseList(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { current: {id: creatorId} } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getCourseList(creatorId);

      setCourseList(dataObj);
    })();

    setLoading(false);
  }, [creatorId]);

  const handleDetailButton = (id) => {
    navigate(`/creator/${id}`);
  };

  const handleUpdateButton = (id) => {
    navigate(`/creator/update-course/${id}`);
  };

  const handleDeleteButton = (id) => {
    setOpenDialog(true);
    setSelectedId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    try {
      setOpenDialog(false);
      const result = await courseApi.deleteCourse(selectedId);

      if (result.success) {
        enqueueSnackbar('Change course status successfully!', {
          variant: 'success',
        });

        //refresh course list
        const { dataObj } = await courseApi.getCourseList(1);
        setCourseList(dataObj);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
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
      field: 'isDeleted',
      headerName: 'Trạng thái',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.value !== 'false' ? 'Đã ẩn' : 'Bình thường';
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
          label="Danh sách bài học"
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
        {!loading && <DataGrid rows={courseList} columns={columns} />}
      </Box>

      <ConfirmDialog
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        onSubmit={handleDelete}
        title="Bạn có muốn thay đổi trạng thái khóa học ID"
        item={selectedId}
      />
    </Box>
  );
}

export default CourseList;
