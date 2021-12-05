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

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box>
      This is Add Course 
      <AddCourseForm onFormSubmit={onSubmit} types={types} />
    </Box>
  );
}

export default AddCourse;
