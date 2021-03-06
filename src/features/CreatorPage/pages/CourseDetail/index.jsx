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
      headerName: 'T??n b??i h???c',
      width: 300,
      headerAlign: 'center',
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
      headerName: 'Lo???i b??i h???c',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isDeleted',
      headerName: 'Tr???ng th??i',
      width: 150,
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
          icon={<BrightnessLowIcon />}
          label="C???p nh???p b??i h???c"
          onClick={() => handleDetailButton(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Typography className={classes.title}>
        Trang th??ng tin chi ti???t kh??a h???c
      </Typography>
      <Typography className={classes.description}>
        ????y l?? n??i hi???n th??? chi ti???t kh??a h???c v?? danh s??ch c??c b??i h???c trong
        kh??a.
      </Typography>

      <Box mb={2} ml={1}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            T??n kh??a h???c
          </Grid>
          <Grid item xs={12} sm={6}>
            {course?.course_name}
          </Grid>

          <Grid item xs={12} sm={6}>
            Mi??u t???
          </Grid>
          <Grid item xs={12} sm={6}>
            {course?.description}
          </Grid>

          <Grid item xs={12} sm={6}>
            Tr???ng th??i
          </Grid>
          <Grid item xs={12} sm={6}>
            {!course?.approved_date
              ? 'Ch??a ph?? duy???t'
              : `${moment(course?.approved_date).format('DD-MM-YYYY')}`}
          </Grid>

          <Grid item xs={12} sm={6}>
            Gi???i h???n ng?????i d??ng
          </Grid>
          <Grid item xs={12} sm={6}>
            {course?.max_user === 0 || !course?.max_user
              ? 'Kh??ng gi???i h???n'
              : `${parseInt(course?.max_user)} ng?????i d??ng`}
          </Grid>

          <Grid item xs={12} sm={6}>
            S??? l?????ng b??i h???c
          </Grid>
          <Grid item xs={12} sm={6}>
            {course?.lessonList?.length}
          </Grid>
        </Grid>
      </Box>

      <Box mb={2}>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/creator/add-lesson/${id}`)}
        >
          Th??m b??i h???c
        </Button>
      </Box>

      <Box style={{ height: 400, width: '100%' }}>
        {!loading && <DataGrid rows={lessonList} columns={columns} />}
      </Box>

      <Box mt={2}>
        <Button onClick={() => navigate(-1)} variant="outlined">
          Quay l???i
        </Button>
      </Box>

      <ConfirmDialog
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        onSubmit={handleDelete}
        title="B???n c?? mu???n thay ?????i tr???ng th??i b??i h???c ID"
        item={selectedId}
      />
    </Box>
  );
}

export default CourseDetail;
