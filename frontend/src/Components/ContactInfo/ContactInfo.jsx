import React from 'react';
import classes from './ContactInfo.module.css';

const ContactInfo = () => {
  return (
    <div className={classes.contactContainer}>
      <div className={classes.contactItem}>
        <span>Гаряча лінія</span>
        <p className={classes.contactNumber}>0 800 228 000</p>
      </div>
      <div className={classes.contactItem}>
        <span>Для дзвінків з-за кордону</span>
        <p className={classes.contactNumber}>
          +38 (044) 228 46 50 | +38 (044) 590 48 99
        </p>
      </div>
      <div className={classes.contactItem}>
        <span>E-MAIL</span>
        <p className={classes.contactEmail}>contactcentre@chinazesbank.com</p>
      </div>
    </div>
  );
};

export default ContactInfo;
