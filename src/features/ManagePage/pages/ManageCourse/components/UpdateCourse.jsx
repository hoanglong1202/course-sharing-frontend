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

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box>
      {!loading && <UpdateCourseForm onFormSubmit={onSubmit} course={course} />}
    </Box>
  );
}

export default UpdateCourse;
