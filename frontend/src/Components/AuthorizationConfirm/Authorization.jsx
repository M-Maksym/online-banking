import React from 'react'
import classes from './Authorization.module.css'
import ExcRate from '../ExchangeRate/ExchangeRate'
import Left from '../LeftSite/Left'
import ContactInfo from '../ContactInfo/ContactInfo'
import AuthConfForm from '../AuthConfForm/AuthConfForm';

const Authorization = () => {
  return (
    <div>
      <div>
        <ExcRate/>
      </div>
      <div className={classes.siteContainer}>
        <Left/>
        <AuthConfForm/>
      </div>
      <div>
        <ContactInfo/>
      </div>
    </div>
  )
}

export default Authorization