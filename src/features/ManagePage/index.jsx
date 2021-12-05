import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageCourse from './pages/ManageCourse';
import ManageUser from './pages/ManageUser';

ManagePage.propTypes = {};

function ManagePage(props) {
  return (
    <Routes>
      <Route path="course/*" element={<ManageCourse />} />
      <Route path="user/*" element={<ManageUser />} />
    </Routes>
  );
}

export default ManagePage;
