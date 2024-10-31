import React from 'react';
import classes from './Left.module.css'; 
import img from './Logo.png'

import { useNavigate } from 'react-router-dom' 

const BankComponent = () => {

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/');
  };

  return (
    <div className={classes.bankContainer}>
      <div className={classes.logoContainer} onClick={handleSearch}>
        <div className={classes.logo}>
          <img src={img} alt="Logo" />
        </div>
      </div>
      <div className={classes.textContainer}>
        <p>ChinazesBank online -</p>
        <p>доступ до фінансів в один клік</p>
      </div>
    </div>
  );
};

export default BankComponent;
