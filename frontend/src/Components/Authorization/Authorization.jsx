import React from 'react'
import classes from './Authorization.module.css'
import ExcRate from '../ExchangeRate/ExchangeRate'
import Auth from '../AuthForm/AuthForm'
import Left from '../LeftSite/Left'
import ContactInfo from '../ContactInfo/ContactInfo'

const Authorization = () => {
  return (
    <div>
      <div>
        <ExcRate/>
      </div>
      <div className={classes.siteContainer}>
        <Left/>
        <Auth/>
      </div>
      <div>
        <ContactInfo/>
      </div>
    </div>
  )
}

export default Authorization