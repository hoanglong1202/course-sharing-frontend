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
import CheckIcon from '@mui/icons-material/Check';
import courseApi from 'api/courseApi';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment';

ApproveCourse.propTypes = {};

function ApproveCourse(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [tabValue, setTabValue] = useState('1');

  const totalCourse = courseList.length;
  const approvedCourse = [...courseList].filter((course) => course.isApproved === 'true').length;
  const inApprovedCourse = [...courseList].filter((course) => course.isApproved === 'false').length;
  const deletedCourse = [...courseList].filter((course) => course.isDeleted === 'true').length;
  const totalView = [...courseList].reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.viewed), 0);

  const [isDeleting, setIsDeleting] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (parseInt(newValue) === 1) {
      setFilteredUserList([...courseList]);
    }

    if (parseInt(newValue) === 2) {
      const filter = [...courseList].filter(
        (user) => user.isApproved === 'false'
      );
      setFilteredUserList(filter);
    }

    if (parseInt(newValue) === 3) {
      const filter = [...courseList].filter((user) => user.isApproved === 'true');
      setFilteredUserList(filter);
    }
  };

  useEffect(() => {
    (async () => {
      const { dataObj } = await adminApi.getAdminCourseList();

      setCourseList(dataObj);
      setFilteredUserList(dataObj);
    })();

    setLoading(false);
  }, []);

  const handleUpdateButton = (id) => {
    setIsDeleting(false);
    setOpenDialog(true);
    setSelectedId(id);
  };

  const handleDeleteButton = (id) => {
    setIsDeleting(true);
    setOpenDialog(true);
    setSelectedId(id);
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
        const { dataObj } = await adminApi.getAdminCourseList();

        setCourseList(dataObj);
        setFilteredUserList(dataObj);
        setTabValue('1');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleApprove = async () => {
    try {
      setOpenDialog(false);
      const result = await adminApi.approveCourse(selectedId);

      if (result.success) {
        enqueueSnackbar('Approved course successfully!', {
          variant: 'success',
        });

        //refresh course list
        const { dataObj } = await adminApi.getAdminCourseList();

        setCourseList(dataObj);
        setFilteredUserList(dataObj);
        setTabValue('1');
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
      width: 80,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'course_name',
      headerName: 'Tên khóa học',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'viewed',
      headerName: 'Lượt xem',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'favourited',
      headerName: 'Yêu thích',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'creator_name',
      headerName: 'Người tạo',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'approved_date',
      headerName: 'Ngày phê duyệt',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.value ? moment(params.value).format("DD-MM-YYYY") : 'Chưa phê duyệt';
      },
    },
    {
      field: 'isApproved',
      headerName: 'Duyệt',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.value !== 'false' ? 'Đã duyệt' : 'Chưa phê duyệt';
      },
    },
    {
      field: 'isDeleted',
      headerName: 'Trạng thái',
      width: 130,
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
          onClick={() =>
            handleDeleteButton(params.id)
          }
        />,
        <GridActionsCellItem
          icon={params.getValue(params.id, 'isApproved') === 'false' ? <CheckIcon /> : <CheckCircleOutlineIcon/>}
          label="Phê duyệt"
          disabled={params.getValue(params.id, 'isApproved') === 'false' ? false : true}
          onClick={() =>
            handleUpdateButton(params.id)
          }
        />,
        <GridActionsCellItem
          icon={<BrightnessLowIcon/>}
          label="Detail"
          onClick={() =>
            navigate(`/creator/${params.id}`)
          }
        />,
      ],
    },
  ];

  return (
    <Box>
      <Typography className={classes.title}>Danh sách khóa học</Typography>
      <Typography className={classes.description}>
        Đây là nơi lưu trữ thông tin thống kê của số liệu người dùng ở Website&nbsp;
        <b>Course Sharing</b>
      </Typography>

      <Box mb={2} ml={1}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            Tổng số khóa học:
          </Grid>
          <Grid item xs={12} sm={6}>
            {totalCourse}
          </Grid>

          <Grid item xs={12} sm={6}>
            Số khóa học đã duyệt:
          </Grid>
          <Grid item xs={12} sm={6}>
           {approvedCourse}
          </Grid>

          <Grid item xs={12} sm={6}>
          Số khóa học chưa duyệt:
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {inApprovedCourse}
          </Grid>

          <Grid item xs={12} sm={6}>
            Số khóa học bị ẩn
          </Grid>
          <Grid item xs={12} sm={6}>
            {deletedCourse}
          </Grid>

          <Grid item xs={12} sm={6}>
            Tổng số lượt xem
          </Grid>
          <Grid item xs={12} sm={6}>
            {totalView}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange}>
              <Tab label="Toàn bộ" value="1" />
              <Tab label="Chưa duyệt" value="2" />
              <Tab label="Đã duyệt" value="3" />
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
        onSubmit={isDeleting ? handleDelete : handleApprove}
        title="Bạn có muốn thay đổi trạng thái khóa học ID"
        item={selectedId}
      />
    </Box>
  );
}

export default ApproveCourse;
