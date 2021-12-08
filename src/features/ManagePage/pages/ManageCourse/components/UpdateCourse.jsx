import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import useStyles from '../styles';
import UpdateCourseForm from './UpdateCourseForm';

function UpdateCourse(props) {
  // const classes = useStyles();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});

  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getCourse(id);
      setCourse(dataObj);
      setLoading(false);
    })();

  }, []);

  const onSubmit = async (values) => {
    try {
      let temp = { ...values };

      temp.course_name = values.course_name.trim();
      temp.description = values.description.trim();
      temp.cover_picture = values?.profile_picture[0]?.name;
      temp.creator_id = 1;
      temp.id = id;
  
      const formData = new FormData();
      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));
  
      await courseApi.updateCourse(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {!loading && <UpdateCourseForm onFormSubmit={onSubmit} course={course} />}
    </Box>
  );
}

export default UpdateCourse;
