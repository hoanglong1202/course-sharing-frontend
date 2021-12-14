import { Box } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LinkMenu from './components/LinkMenu';
import AddCreator from './pages/AddCreator';
import AddUser from './pages/AddUser';
import ApproveCourse from './pages/ApproveCourse';
import ManageCategory from './pages/ManageCategory';
import ManageUser from './pages/ManageUser';
import UpdateCreator from './pages/UpdateCreator';
import UpdateUser from './pages/UpdateUser';

AdminPage.propTypes = {};

function AdminPage(props) {
  return (
    <Box>
      <LinkMenu />

      <Routes>
        <Route path="/" element={<ManageUser />} />
        <Route path="update-user/:id" element={<UpdateUser />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="update-creator/:id" element={<UpdateCreator />} />
        <Route path="add-creator" element={<AddCreator />} />
        <Route path="category" element={<ManageCategory />} />
        <Route path="approve" element={<ApproveCourse />} />
      </Routes>
    </Box>
  );
}

export default AdminPage;
