import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import adminApi from 'api/adminApi';
import courseApi from 'api/courseApi';
import ConfirmDialog from 'components/ConfirmDialog';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import useStyles from '../../styles';
import UpdateDialog from './components/UpdateDialog';

ManageCategory.propTypes = {};

function ManageCategory(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [isUpdate, setIsUpdate] = useState(true);

  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getCourseTypes();

      setTypes(dataObj);
    })();

    setLoading(false);
  }, []);

  const handleUpdateButton = (id) => {
    setOpenUpdateDialog(true);
    setIsUpdate(true)
    setSelectedId(id);
  };

  const handleAddButon = (id) => {
    setOpenUpdateDialog(true);
    setIsUpdate(false)
  };

  const handleDeleteButton = (id) => {
    setOpenDialog(true);
    setSelectedId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleDelete = async () => {
    try {
      setOpenDialog(false);
      const result = await adminApi.removeCourseType(selectedId);

      if (result.success) {
        enqueueSnackbar('Delete type status successfully!', {
          variant: 'success',
        });

        //refresh course list
        const { dataObj } = await courseApi.getCourseTypes();

        setTypes(dataObj);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleUpdate = async (data) => {
    try {
      setOpenUpdateDialog(false);
      const newType = { id: selectedId, name: data };
      const result = await adminApi.updateCourseType(newType);

      if (result.success) {
        enqueueSnackbar('Update type successfully!', {
          variant: 'success',
        });

        //refresh course list
        const { dataObj } = await courseApi.getCourseTypes();

        setTypes(dataObj);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleAddType = async (data) => {
    try {
      setOpenUpdateDialog(false);
      const newType = { name: data };
      const result = await adminApi.addCourseType(newType);

      if (result.success) {
        enqueueSnackbar('Add type successfully!', {
          variant: 'success',
        });

        //refresh course list
        const { dataObj } = await courseApi.getCourseTypes();

        setTypes(dataObj);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Tên danh mục',
      width: 350,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total',
      headerName: 'Số khóa học',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isDeleted',
      headerName: 'Trạng thái',
      width: 200,
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
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() =>
            handleDeleteButton(params.id)
          }
        />,
        <GridActionsCellItem
          icon={<BrightnessLowIcon/>}
          label="Detail"
          onClick={() =>
            handleUpdateButton(params.id)
          }
        />,
      ],
    },
  ];

  return (
    <Box>
      <Typography className={classes.title}>Quản lý danh mục</Typography>
      <Typography className={classes.description}>
        Đây là nơi quản lý danh mục ở Website&nbsp;
        <b>Course Sharing</b>
      </Typography>

      <Box mb={2} ml={1}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            Tổng số danh mục:
          </Grid>
          <Grid item xs={12} sm={6}>
            {types.length} danh mục
          </Grid>

          <Grid item xs={12} sm={6}>
            Số danh mục đã ẩn:
          </Grid>
          <Grid item xs={12} sm={6}>
            {types.filter(x => x.isDeleted === 'true').length} danh mục
          </Grid>
        </Grid>
      </Box>

      <Box mb={2}>
        <Button variant="contained" size="small" onClick={handleAddButon}>
          Thêm danh mục
        </Button>
      </Box>

      <Box style={{ height: 400, width: '100%' }}>
        {!loading && <DataGrid rows={types} columns={columns} />}
      </Box>

      <ConfirmDialog
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        onSubmit={handleDelete}
        title="Bạn có muốn thay đổi trạng thái danh mục ID"
        item={selectedId}
      />

      <UpdateDialog
        isOpen={openUpdateDialog}
        handleClose={handleCloseUpdateDialog}
        onSubmit={isUpdate ? handleUpdate : handleAddType}
        title={`Bạn có muốn ${isUpdate ? `thay đổi trạng thái danh mục ID` : `thêm mới danh mục`}`}
        item={isUpdate ? selectedId : ''}
      />
    </Box>
  );
}

export default ManageCategory;
