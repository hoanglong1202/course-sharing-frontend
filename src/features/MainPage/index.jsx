import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';

function MainPage(props) {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} end />
      <Route path="all" element={<SearchPage />} />
    </Routes>
  );
}

export default MainPage;
