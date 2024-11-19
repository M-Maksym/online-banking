import React, { useEffect, useState } from 'react';
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
import Account from './Components/Account/AccountPage';
import Deposit from './Components/Deposit/Deposit';
import FunctionHeader from './Components/FunctionHeader/FunctionHeader';
import Profile from './Components/Account/AccountPage';
import Convertor from './Components/Convertor/Convertor';

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/Authorization", "/AuthorizationConfirm"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    setIsLoggedIn(!!token);
  });

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && (
        isLoggedIn ? <FunctionHeader /> : <MainHeader />
      )}
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Advantages" element={<Advantages />} />
        <Route path="/Authorization" element={<Authorization />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Operations" element={<Operations />} />
        <Route path="/Cards" element={<Cards />} />
        <Route path="/Deposit" element={<Deposit />} />
        <Route path="/AuthorizationConfirm" element={<AuthorizationConfirm />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Convertor" element={<Convertor />} />
      </Routes>
    </>
  );
}

export default App;
