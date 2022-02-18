import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateFacebookUrl, validateYouTubeUrl } from 'utils';
import AddCourseForm from './components/AddCourseForm';

function AddCourse(props) {
  // const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { current: {id: creatorId} } = useSelector((state) => state.auth);

  const [types, setTypes] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);

  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getLessonTypes();
      const { dataObj: courseType } = await courseApi.getCourseTypes();

      setCourseTypes(courseType);
      setTypes(dataObj);
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      let temp = { ...values };

      temp.course_name = values.course_name.trim();
      temp.description = values.description.trim();
      temp.cover_picture = values?.profile_picture[0]?.name;
      temp.creator_id = creatorId;
      temp.lesson = JSON.stringify(
        values.lesson.map((item) => {
          const type = parseInt(item?.lesson_types_id);
          let content;

          if (type === 1) {
            content = validateYouTubeUrl(item?.content.trim());
          } else if (type === 2) {
            content = validateFacebookUrl(item?.content.trim());
          } else {
            content = '';
          }

          return {
            ...item,
            lesson_name: item.lesson_name.trim(),
            description: item.description.trim(),
            content,
          };
        })
      );
      delete temp.profile_picture;

      const formData = new FormData();
      formData.append('profile_picture', values?.profile_picture[0]);
      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));

      const result = await courseApi.addCourse(formData);
      if (result.success) {
        enqueueSnackbar('Thêm khóa học thành công!', {
          variant: 'success',
        });

        navigate(`/creator/list`);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box>
      <AddCourseForm onFormSubmit={onSubmit} courseTypes={courseTypes} types={types} />
    </Box>
  );
}

export default AddCourse;
