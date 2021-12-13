import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import useStyles from '../styles';
import UpdateCourseForm from './components/UpdateCourseForm';
function UpdateCourse(props) {
  // const classes = useStyles();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { current: {id: creatorId} } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [courseTypes, setCourseTypes] = useState([]);

  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getCourse(id);
      const { dataObj: courseType } = await courseApi.getCourseTypes();

      setCourseTypes(courseType);
      setCourse(dataObj);
      setLoading(false);
    })();

  }, [id]);

  const onSubmit = async (values) => {
    try {
      let temp = { ...values };

      temp.course_name = values.course_name.trim();
      temp.description = values.description.trim();
      temp.cover_picture = values?.profile_picture[0]?.name;
      temp.creator_id = creatorId;
      temp.id = id;
      delete temp.profile_picture;
  
      const formData = new FormData();
      formData.append('profile_picture', values?.profile_picture[0]);
      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));
  
      const result =  await courseApi.updateCourse(formData);

      if (result.success) {
        enqueueSnackbar('Change course status successfully!', {
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
      {!loading && <UpdateCourseForm onFormSubmit={onSubmit} course={course} courseTypes={courseTypes} />}
    </Box>
  );
}

export default UpdateCourse;
