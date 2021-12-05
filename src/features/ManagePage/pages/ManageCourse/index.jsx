import { Box } from '@mui/system';
import React from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
import AddCourse from './components/AddCourse';
import CourseList from './components/CourseList';
import LinkMenu from './components/LinkMenu';


function ManageCourse(props) {
  
  return (
    <Box>
      This is Course Managee
      <LinkMenu />

      <Routes>
        <Route path="/" element={<AddCourse />} />
        <Route path="list" element={<CourseList />} />
      </Routes>
    </Box>
  );
}

export default ManageCourse;
