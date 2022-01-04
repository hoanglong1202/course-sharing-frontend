import courseApi from 'api/courseApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateFacebookUrl, validateYouTubeUrl } from 'utils';
import UpdateLessonForm from './components/UpdateLessonForm';

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
      const temp = value;

      temp.lesson_name = value?.lesson_name.trim();
      temp.description = value?.description.trim();

      const type = parseInt(value?.lesson_types_id);

      if (type === 1) {
        temp.content = validateYouTubeUrl(value?.content.trim());
      } else if (type === 2) {
        temp.content = validateFacebookUrl(value?.content.trim());
      } else {
        temp.content = '';
      }

      const result = await courseApi.updateLesson(courseId, lessonId, temp);

      if (result.success) {
        enqueueSnackbar('Change lesson status successfully!', {
          variant: 'success',
        });

        navigate(`/creator/${courseId}`);
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
