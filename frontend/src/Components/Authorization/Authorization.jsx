import React from 'react'
import classes from './Authorization.module.css'
import ExcRate from '../ExchangeRate/ExchangeRate'
import Auth from '../AuthForm/AuthForm'
import Left from '../LeftSite/Left'
import ContactInfo from '../ContactInfo/ContactInfo'

const Authorization = () => {
  return (
    <div className={classes.container}>
      <div>
        <ExcRate/>
      </div>
      <div className={classes.killME}>
        <div className={classes.siteContainer}>
          <Left/>
          <Auth/>
        </div>
        <div className={classes.contactInfo}>
          <ContactInfo/>
        </div>
      </div>
    </div>
  )
}

export default Authorization