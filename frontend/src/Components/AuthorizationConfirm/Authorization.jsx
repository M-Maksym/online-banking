import React from 'react'
import classes from './Authorization.module.css'
import ExcRate from '../ExchangeRate/ExchangeRate'
import Left from '../LeftSite/Left'
import ContactInfo from '../ContactInfo/ContactInfo'
import AuthConfForm from '../AuthConfForm/AuthConfForm';

import { useLocation } from "react-router-dom";

const Authorization = () => {
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "Номер телефону не вказаний";

  return (
    <div>
      <div>
        <ExcRate/>
      </div>
      <div className={classes.siteContainer}>
        <Left/>
        <AuthConfForm number={phoneNumber}/>
      </div>
      <div>
        <ContactInfo/>
      </div>
    </div>
  )
}

export default Authorization