import React from 'react'
import AboutUs from '../AboutUs/AboutUs'
import Advantages from '../Advantages/Advantages'
import Reviews from '../Reviews/Reviews'
import Authorization from '../Authorization/Authorization'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './mainheaderstyle.css'

export default function MainHeader() {
  return (
    <>
    <div class="topnav">
      <div className="logo">
      </div>
      <div className="links">
      <div className="nav_el">
  <a  className='navtext' href="/">Наші переваги</a>
  </div>
  <div className="nav_el">
  <a className='navtext' href="/Reviews">Відгуки</a>
  </div>
  <div className="nav_el">
  <a className='navtext' href="/AboutUs">Про нас</a>
  </div>
  </div>
  <div className="nav_el">
    <div className="navblock">
  <a className='navtext' href="/Authorization">Увійти</a>
  </div>
  </div>
  </div>

</>
  )
}
