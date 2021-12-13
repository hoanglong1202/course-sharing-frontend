import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LinkMenu from './components/LinkMenu';
import AddCourse from './pages/AddCourse';
import CourseDetail from './pages/CourseDetail';
import CourseList from './pages/CourseList';
import UpdateCourse from './pages/UpdateCourse';
import UpdateLesson from './pages/UpdateLesson';

CreatorPage.propTypes = {};

function CreatorPage(props) {
  return (
    <Box>
    This is Course Managee
    <LinkMenu />
  
    <Routes>
      <Route path="/" element={<AddCourse />} />
      <Route path="list" element={<CourseList />} />
      <Route path=":id" element={<CourseDetail />} />
      <Route path="update-course/:id" element={<UpdateCourse />} />
      <Route path="update-lesson/:courseId/:lessonId" element={<UpdateLesson />} />
    </Routes>
  </Box>
  );
}

export default CreatorPage;
