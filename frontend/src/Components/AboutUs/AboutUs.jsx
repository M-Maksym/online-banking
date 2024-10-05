import React from 'react'
import './aboutus.css'
import MainHeader from '../MainHeader/MainHeader'
export default function AboutUs() {
  return (
    <div className="container">
      <MainHeader />
      <div class="block-1">
        <p className='aboutblock1text'>
      Ласкаво просимо до CHINAZESBANK – вашого надійного фінансового партнера! Наш інтернет-банк пропонує сучасні рішення для швидкого, безпечного й зручного управління вашими фінансами з будь-якого місця і в будь-який час.
      </p>
</div>


<div class="block-2">
    <div class="sub-block-1">
    </div>
    <div class="sub-block-2">
      <div className="part1">
        <div className="imgblock"></div>
      </div>
      <div className="part2">
        <div className='mainbutton'><a className='linkservice'>Замовляй картку онлайн</a></div>
      </div>
        
    </div>
</div>

    </div>
  )
}
