import React from 'react'

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
  <a  className='navtext' href="/">Про нас</a>
  </div>
  <div className="nav_el">
  <a className='navtext' href="/Reviews">Відгуки</a>
  </div>
  <div className="nav_el">
  <a className='navtext' href="/Advantages">Наші переваги</a>
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
