import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Operations from './Components/Operations/Operations';
import Cards from './Components/Cards/Cards';
import AuthorizationConfirm from './Components/AuthorizationConfirm/Authorization';
import Authorization from './Components/Authorization/Authorization';
import MainHeader from './Components/MainHeader/MainHeader';
import AboutUs from './Components/AboutUs/AboutUs';
import Advantages from './Components/Advantages/Advantages';
import Reviews from './Components/Reviews/Reviews';

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/Authorization", "/AuthorizationConfirm"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <MainHeader />}
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Advantages" element={<Advantages />} />
        <Route path="/Authorization" element={<Authorization />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Operations" element={<Operations />} />
        <Route path="/Cards" element={<Cards />} />
        <Route path="/AuthorizationConfirm" element={<AuthorizationConfirm />} />
      </Routes>
    </>
  );
}

export default App;
