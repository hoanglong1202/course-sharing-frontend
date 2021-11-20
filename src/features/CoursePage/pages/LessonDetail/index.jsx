import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

LessonDetail.propTypes = {};

function LessonDetail(props) {
  let { courseId, lessonId } = useParams();
  return (
    <div>
      This is Lesson Detail of {lessonId} in course {courseId}
    </div>
  );
}

export default LessonDetail;
