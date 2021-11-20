import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CourseDetail from './pages/CourseDetail';
import LessonDetail from './pages/LessonDetail';

function CoursePage(props) {
  return (
    <Routes>
      <Route path=":courseId" element={<CourseDetail />} />
      <Route path=":courseId/:lessonId" element={<LessonDetail />} />
    </Routes>
  );
}

export default CoursePage;
