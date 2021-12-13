import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageUser from './pages/ManageUser';
import ApproveCourse from './pages/ApproveCourse';
import ManageCategory from './pages/ManageCategory';
import { Box } from '@mui/system';
import LinkMenu from './components/LinkMenu';
import UpdateUser from './pages/UpdateUser';
import UpdateCreator from './pages/UpdateCreator';

AdminPage.propTypes = {};

function AdminPage(props) {
  return (
    <Box>
      <LinkMenu />

      <Routes>
        <Route path="/" element={<ManageUser />} />
        <Route path="update-user/:id" element={<UpdateUser />} />
        <Route path="update-creator/:id" element={<UpdateCreator />} />
        <Route path="category" element={<ManageCategory />} />
        <Route path="approve" element={<ApproveCourse />} />
      </Routes>
    </Box>
  );
}

export default AdminPage;
