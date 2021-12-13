import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from 'components/NotFound';
import MainPage from 'features/MainPage';
import CoursePage from 'features/CoursePage';
import CreatorPage from 'features/CreatorPage';
import AdminPage from 'features/AdminPage';

function Routing() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />} />
      <Route path="/course/*" element={<CoursePage />} />
      <Route path="/creator/*" element={<CreatorPage />} />
      <Route path="/admin/*" element={<AdminPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Routing;
