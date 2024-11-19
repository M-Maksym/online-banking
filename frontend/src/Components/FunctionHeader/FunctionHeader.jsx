import React from 'react'
import  './FunctionHeaderStyle.css'
export default function () {
  return (
    <>
     <div class="topnav">
      <div className="logo">
      </div>
      <div className="links">
      <div className="nav_el">
  <a  className='navtext' href="/Operations">Гаманець</a>
  </div>
  <div className="nav_el">
  <a className='navtext' href="/Deposit">Перекази</a>
  </div>
  <div className="nav_el">
  <a className='navtext' href="/Convertor">Конвертор</a>
  </div>
  </div>
  <div className="nav_el">
  <a className='navtext' href="/Profile">
    <div className="autimg"></div>
  </a>
  </div>
  </div>
  
    </>
  )
}
