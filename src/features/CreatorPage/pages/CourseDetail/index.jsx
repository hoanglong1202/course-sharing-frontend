import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import courseApi from 'api/courseApi';
import ConfirmDialog from 'components/ConfirmDialog';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStyles from '../../styles';

CourseDetail.propTypes = {};

function CourseDetail(props) {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [lessonList, setLessonList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getCourse(id);

      setCourse(dataObj);
      setLessonList(dataObj?.lessonList);
    })();

    setLoading(false);
  }, [id]);

  const handleDetailButton = (lessonId) => {
    navigate(`/creator/update-lesson/${id}/${lessonId}`);
  };

  const handleDeleteButton = (id) => {
    setOpenDialog(true);
    setSelectedId(id);
  };

  const handleDelete = async () => {
    try {
      setOpenDialog(false);
      const result = await courseApi.deleteLesson(id, selectedId);

      if (result.success) {
        enqueueSnackbar('Change lesson status successfully!', {
          variant: 'success',
        });

        //refresh lesson list
        const { dataObj } = await courseApi.getCourse(id);
        setLessonList(dataObj?.lessonList);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'lesson_name',
      headerName: 'Tên bài học',
      width: 200,
      headerAlign: 'center',
      // align: 'center',
    },
    // {
    //   field: 'description',
    //   headerName: 'Mô tả',
    //   width: 400,
    //   headerAlign: 'center',
    //   align: 'center',
    // },
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
      field: 'isDeleted',
      headerName: 'Trạng thái',
      width: 150,
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

      <Box mb={2}>
        <Button variant="contained" size="small" onClick={() => navigate(`/creator/add-lesson/${id}`)}>
          Thêm bài học
        </Button>
      </Box>

      <Box style={{ height: 400, width: '100%' }}>
        {!loading && <DataGrid rows={lessonList} columns={columns} />}
      </Box>

      <ConfirmDialog
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        onSubmit={handleDelete}
        title="Bạn có muốn thay đổi trạng thái bài học ID"
        item={selectedId}
      />
    </Box>
  );
}

export default CourseDetail;
