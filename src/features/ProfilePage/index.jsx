import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LinkMenu from './components/LinkMenu';
import UserCoursePage from './pages/UserCoursePage';
import ManageProfile from './pages/MangeProfile';

ProfilePage.propTypes = {};

function ProfilePage(props) {
  return (
    <Box>
      <LinkMenu />

      <Routes>
        <Route path="/" element={<ManageProfile />} />
        <Route path="course" element={<UserCoursePage />} />
      </Routes>
    </Box>
  );
}

export default ProfilePage;
