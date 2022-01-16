import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from 'components/NotFound';
import MainPage from 'features/MainPage';
import CoursePage from 'features/CoursePage';
import CreatorPage from 'features/CreatorPage';
import AdminPage from 'features/AdminPage';
import ProfilePage from 'features/ProfilePage';
import Analysis from 'features/AnalysisPage';
import Unauthorized from 'components/Unauthorized';
import Forbidden from 'components/Forbidden';

function Routing() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />} />
      <Route path="/course/*" element={<CoursePage />} />
      <Route path="/creator/*" element={<CreatorPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/profile/*" element={<ProfilePage />} />
      <Route path="/analysis" element={<Analysis />} />

      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}

export default Routing;
