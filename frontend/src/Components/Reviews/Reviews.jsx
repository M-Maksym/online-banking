import React from 'react'
import './review.css'
import Revblock from './revblock'
import rev1 from '../../images/rev1.png'
import rev2 from '../../images/rev2.png'
import rev3 from '../../images/rev3.png'
import rev4 from '../../images/rev4.png'
import elements from './elements'
export default function Reviews() {
  return (
    <div className='revcontainer'>
      {elements.map((review, index) => (
        <Revblock
          key={index}
          image={review.image}
          name={review.name}
          text={review.text}
        />
      ))}
    </div>
  );
}
