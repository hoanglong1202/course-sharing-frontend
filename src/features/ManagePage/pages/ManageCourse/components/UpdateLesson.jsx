import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import courseApi from 'api/courseApi';
import UpdateLessonForm from './UpdateLessonForm';
import { useSnackbar } from 'notistack';

UpdateLesson.propTypes = {};

function UpdateLesson(props) {
  const { courseId, lessonId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [lesson, setLesson] = useState({});

  useEffect(() => {
    (async () => {
      const { dataObj } = await courseApi.getLessonDetail(courseId, lessonId);
      const { dataObj: lessonTypes } = await courseApi.getLessonTypes();

      setTypes(lessonTypes);
      setLesson(dataObj);
      setLoading(false);
    })();
  }, [courseId, lessonId]);

  const handleSubmit = async (value) => {
    try {
      console.log(value);
      const temp = value;
      
      temp.lesson_name = value?.lesson_name.trim();
      temp.description = value?.description.trim();
      temp.content = value?.content.trim();

      const result = await courseApi.updateLesson(courseId, lessonId, temp);

      if (result.success) {
        enqueueSnackbar('Change lesson status successfully!', {
          variant: 'success',
        });

        navigate(`/manage/course/${courseId}`);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      {!loading && (
        <UpdateLessonForm
          lesson={lesson}
          onFormSubmit={handleSubmit}
          lessonTypes={types}
        />
      )}
    </div>
  );
}

export default UpdateLesson;
