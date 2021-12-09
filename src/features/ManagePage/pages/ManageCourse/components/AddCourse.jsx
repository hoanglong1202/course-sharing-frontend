import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import React, { useEffect, useState } from 'react';
// import useStyles from '../styles';
// import PropTypes from 'prop-types';
import AddCourseForm from './AddCourseForm';

// AddCourse.propTypes = {};

function AddCourse(props) {
  // const classes = useStyles();

  const [types, setTypes] = useState([]);

  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getLessonTypes();

      setTypes(dataObj);
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      let temp = { ...values };

      temp.course_name = values.course_name.trim();
      temp.description = values.description.trim();
      temp.cover_picture = values?.profile_picture[0]?.name;
      temp.creator_id = 1;
      temp.lesson = JSON.stringify(
        values.lesson.map((item) => {
          return {
            ...item,
            lesson_name: item.lesson_name.trim(),
            description: item.description.trim(),
            content: item.content.trim(),
          };
        })
      );

      // console.log(temp);

      const formData = new FormData();
      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));
      formData.append('test[]', 'haha');



      await courseApi.addCourse(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <AddCourseForm onFormSubmit={onSubmit} types={types} />
    </Box>
  );
}

export default AddCourse;
