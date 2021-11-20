import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from 'components/NotFound';
import MainPage from 'features/MainPage';
import CoursePage from 'features/CoursePage';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/course/*" element={<CoursePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Routing;
