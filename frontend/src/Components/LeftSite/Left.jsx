import React from 'react';
import classes from './Left.module.css'; 
import img from './Logo.png'

const BankComponent = () => {
  return (
    <div className={classes.bankContainer}>
      <div className={classes.logoContainer}>
        <div className={classes.logo}>
          {/* <span className={classes.bank}>BANK</span>
          <span className={classes.chinazes}>CHINAZES</span> */}
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
