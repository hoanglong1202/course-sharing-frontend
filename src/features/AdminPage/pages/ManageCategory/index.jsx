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
        enqueueSnackbar('C???p nh???p danh m???c th??nh c??ng!', {
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
        enqueueSnackbar('Th??m danh m???c th??nh c??ng!', {
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
      headerName: 'T??n danh m???c',
      width: 350,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total',
      headerName: 'S??? kh??a h???c',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isDeleted',
      headerName: 'Tr???ng th??i',
      width: 200,
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
      <Typography className={classes.title}>Qu???n l?? danh m???c</Typography>
      <Typography className={classes.description}>
        ????y l?? n??i qu???n l?? danh m???c ??? Website&nbsp;
        <b>Course Sharing</b>
      </Typography>

      <Box mb={2} ml={1}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            T???ng s??? danh m???c:
          </Grid>
          <Grid item xs={12} sm={6}>
            {types.length} danh m???c
          </Grid>

          <Grid item xs={12} sm={6}>
            S??? danh m???c ???? ???n:
          </Grid>
          <Grid item xs={12} sm={6}>
            {types.filter(x => x.isDeleted === 'true').length} danh m???c
          </Grid>
        </Grid>
      </Box>

      <Box mb={2}>
        <Button variant="contained" size="small" onClick={handleAddButon}>
          Th??m danh m???c
        </Button>
      </Box>

      <Box style={{ height: 400, width: '100%' }}>
        {!loading && <DataGrid rows={types} columns={columns} />}
      </Box>

      <ConfirmDialog
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        onSubmit={handleDelete}
        title="B???n c?? mu???n thay ?????i tr???ng th??i danh m???c ID"
        item={selectedId}
      />

      <UpdateDialog
        isOpen={openUpdateDialog}
        handleClose={handleCloseUpdateDialog}
        onSubmit={isUpdate ? handleUpdate : handleAddType}
        title={`B???n c?? mu???n ${isUpdate ? `c???p nh???p danh m???c ID` : `th??m m???i danh m???c`}`}
        item={isUpdate ? selectedId : ''}
      />
    </Box>
  );
}

export default ManageCategory;
