import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

CourseDetail.propTypes = {};

function CourseDetail(props) {
  let { courseId } = useParams();
  return <div>This is course Detail of {courseId}</div>;
}

export default CourseDetail;
