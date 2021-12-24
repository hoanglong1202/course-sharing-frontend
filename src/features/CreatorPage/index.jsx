import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LinkMenu from './components/LinkMenu';
import AddCourse from './pages/AddCourse';
import AddLesson from './pages/AddLesson';
import CourseDetail from './pages/CourseDetail';
import CourseList from './pages/CourseList';
import UpdateCourse from './pages/UpdateCourse';
import UpdateLesson from './pages/UpdateLesson';

CreatorPage.propTypes = {};

function CreatorPage(props) {
  const {
    current: { role },
  } = useSelector((state) => state.auth);

  return (
    <Box>
      {role === 'creator' && <LinkMenu />}

      <Routes>
        <Route path="/" element={<AddCourse />} />
        <Route path="list" element={<CourseList />} />
        <Route path=":id" element={<CourseDetail />} />
        <Route path="update-course/:id" element={<UpdateCourse />} />
        <Route
          path="update-lesson/:courseId/:lessonId"
          element={<UpdateLesson />}
        />

        <Route path="add-lesson/:courseId" element={<AddLesson />} />
      </Routes>
    </Box>
  );
}

export default CreatorPage;
