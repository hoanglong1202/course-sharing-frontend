import { Box } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddCourse from './components/AddCourse';
import CourseList from './components/CourseList';
import LinkMenu from './components/LinkMenu';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';

function ManageCourse(props) {
  return (
    <Box>
      This is Course Managee
      <LinkMenu />
      <Routes>
        <Route path="/" element={<AddCourse />} />
        <Route path="list" element={<CourseList />} />
        <Route path=":id" element={<CourseDetail />} />
        <Route path="/update-course/:id" element={<UpdateCourse />} />
      </Routes>
    </Box>
  );
}

export default ManageCourse;
