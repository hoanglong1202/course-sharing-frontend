import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import DeleteIcon from '@mui/icons-material/Delete';
import { TabContext, TabList } from '@mui/lab';
import { Button, Grid, Tab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import adminApi from 'api/adminApi';
import ConfirmDialog from 'components/ConfirmDialog';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStyles from '../../styles';

ManageUser.propTypes = {};

function ManageUser(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [total, setTotal] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (parseInt(newValue) === 1) {
      setFilteredUserList([...userList]);
    }

    if (parseInt(newValue) === 2) {
      const filter = [...userList].filter((user) => user.role === 'user');
      setFilteredUserList(filter);
    }

    if (parseInt(newValue) === 3) {
      const filter = [...userList].filter((user) => user.role === 'creator');
      setFilteredUserList(filter);
    }
  };

  useEffect(() => {
    (async () => {
      const {
        dataObj: {
          totalActiveUser,
          totalActiveCreator,
          totalInactiveUser,
          totalinactiveCreator,
          userList,
          creatorList,
        },
      } = await adminApi.getUserList();

      setTotal({
        totalActiveUser,
        totalActiveCreator,
        totalInactiveUser,
        totalinactiveCreator,
      });
      setUserList([...userList, ...creatorList]);
      setFilteredUserList([...userList, ...creatorList]);
    })();

    setLoading(false);
  }, []);

  const handleUpdateButton = (id, role) => {
    if (role === 'creator') {
      navigate(`/admin/update-creator/${id}`)
    }
    if (role === 'user') {
      navigate(`/admin/update-user/${id}`)
    }
  };

  const handleDeleteButton = (id, role) => {
    setOpenDialog(true);
    setSelectedId({ id, role });
  };

  const handleDelete = async () => {
    try {
      setOpenDialog(false);
      const { id: currentId, role: currentRole } = selectedId;
      let result;
      if (currentRole === 'creator') {
        result = await adminApi.removeCreator(currentId);
      }

      if (currentRole === 'user') {
        result = await adminApi.removeUser(currentId);
      }

      if (result.success) {
        enqueueSnackbar('Thay ?????i tr???ng th??i ng?????i d??ng th??nh c??ng!', {
          variant: 'success',
        });

        //refresh lesson list
        const {
          dataObj: {
            totalActiveUser,
            totalActiveCreator,
            totalInactiveUser,
            totalinactiveCreator,
            userList,
            creatorList,
          },
        } = await adminApi.getUserList();

        setTotal({
          totalActiveUser,
          totalActiveCreator,
          totalInactiveUser,
          totalinactiveCreator,
        });
        setUserList([...userList, ...creatorList]);
        setFilteredUserList([...userList, ...creatorList]);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      headerName: 'T??n ng?????i d??ng',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'status',
      headerName: 'Tr???ng th??i',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'role',
      headerName: 'Lo???i ng?????i d??ng',
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
          onClick={() =>
            handleDeleteButton(params.id, params.getValue(params.id, 'role'))
          }
        />,
        <GridActionsCellItem
          icon={<BrightnessLowIcon />}
          label="C???p nh???p b??i h???c"
          onClick={() =>
            handleUpdateButton(params.id, params.getValue(params.id, 'role'))
          }
        />,
      ],
    },
  ];

  return (
    <Box>
      <Typography className={classes.title}>Danh s??ch ng?????i d??ng</Typography>
      <Typography className={classes.description}>
        ????y l?? n??i l??u tr??? th??ng tin th???ng k?? c???a s??? li???u ng?????i d??ng ??? Website
        <b>Course Sharing</b>
      </Typography>
      <Box mb={2} ml={1}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            T???ng s??? ng?????i d??ng ho???t ?????ng:
          </Grid>
          <Grid item xs={12} sm={6}>
            {`${
              parseInt(total?.totalActiveCreator) +
              parseInt(total?.totalActiveUser)
            } ng?????i d??ng`}
          </Grid>

          <Grid item xs={12} sm={6}>
            S??? user ho???t ?????ng:
          </Grid>
          <Grid item xs={12} sm={6}>
            {total?.totalActiveUser} user
          </Grid>

          <Grid item xs={12} sm={6}>
            S??? user b??? kh??a:
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {total?.totalInactiveUser} user
          </Grid>

          <Grid item xs={12} sm={6}>
            S??? creator ho???t ?????ng:
          </Grid>
          <Grid item xs={12} sm={6}>
            {total?.totalActiveCreator} creator
          </Grid>

          <Grid item xs={12} sm={6}>
            S??? creator b??? kh??a:
          </Grid>
          <Grid item xs={12} sm={6}>
            {total?.totalinactiveCreator} creator
          </Grid>
        </Grid>
      </Box>

      <Box component="span">
        <Button variant="contained" size="small" onClick={() => navigate("/admin/add-user")}>
          Th??m Ng?????i d??ng
        </Button>
      </Box>

      <Box component="span" ml={1}>
        <Button variant="contained" size="small" onClick={() => navigate("/admin/add-creator")}>
          Th??m Ng?????i chia s???
        </Button>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange}>
              <Tab label="T???t c???" value="1" />
              <Tab label="Ng?????i d??ng" value="2" />
              <Tab label="Ng?????i chia s???" value="3" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Box style={{ height: 400, width: '100%' }}>
        {!loading && <DataGrid rows={filteredUserList} columns={columns} />}
      </Box>
      <ConfirmDialog
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        onSubmit={handleDelete}
        title="B???n c?? mu???n thay ?????i tr???ng th??i"
        item={`${selectedId.role} v???i ID ${selectedId.id}`}
      />
    </Box>
  );
}

export default ManageUser;
