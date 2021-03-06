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
      headerName: 'T??n kh??a h???c',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    // { field: 'description', headerName: 'Mi??u t???', width: 150 },

    {
      field: 'viewed',
      headerName: 'L?????t xem',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'favourited',
      headerName: 'L?????t y??u th??ch',
      width: 120,
      headerAlign: 'center',
      align: 'center',
    },

    // { field: 'creator_id', headerName: 'Creator ID', width: 100 },
    // { field: 'admin_id', headerName: 'Admin ID', width: 100 },

    {
      field: 'approved_date',
      headerName: 'Ng??y ph?? duy???t',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.value || 'Ch??a ph?? duy???t';
      },
    },
    {
      field: 'max_user',
      headerName: 'Gi???i h???n',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.value && parseInt(params.value) > 0
          ? params.value
          : 'Kh??ng';
      },
    },
    {
      field: 'isDeleted',
      headerName: 'Tr???ng th??i',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.value !== 'false' ? '???? ???n' : 'B??nh th?????ng';
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
          label="Danh s??ch b??i h???c"
          onClick={() => handleDetailButton(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<BrightnessLowIcon />}
          label="C???p nh???p kh??a h???c"
          onClick={() => handleUpdateButton(params.id)}
          showInMenu
        />,
      ],
    },
    // { field: 'register_link', headerName: 'Link ????ng k??', width: 150 },
  ];

  return (
    <Box>
      <Typography className={classes.title}>Kh??a h???c c???a b???n</Typography>
      <Typography className={classes.description}>
        ????y l?? danh s??ch kh??a h???c c???a b???n. B???n c?? th??? c???p nh???p th??ng tin kh??a h???c ho???c c??c b??i h???c ??? ????y
      </Typography>
      <Box style={{ height: 400, width: '100%' }}>
        {!loading && <DataGrid rows={courseList} columns={columns} />}
      </Box>

      <ConfirmDialog
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        onSubmit={handleDelete}
        title="B???n c?? mu???n thay ?????i tr???ng th??i kh??a h???c ID"
        item={selectedId}
      />
    </Box>
  );
}

export default CourseList;
