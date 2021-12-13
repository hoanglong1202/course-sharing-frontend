import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageUser from './pages/ManageUser';
import ApproveCourse from './pages/ApproveCourse';
import ManageCategory from './pages/ManageCategory';
import { Box } from '@mui/system';
import LinkMenu from './components/LinkMenu';

AdminPage.propTypes = {};

function AdminPage(props) {
  return (
    <Box>
      <LinkMenu />

      <Routes>
        <Route path="/*" element={<ManageUser />} />
        <Route path="category/*" element={<ManageCategory />} />
        <Route path="approve/*" element={<ApproveCourse />} />
      </Routes>
    </Box>
  );
}

export default AdminPage;
