import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

LessonDetail.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function LessonDetail(props) {
  const classes = useStyles();
  let { courseId, lessonId } = useParams();
  return (
    <Box>
      This is Lesson Detail of {lessonId} in course {courseId}
    </Box>
  );
}

export default LessonDetail;
