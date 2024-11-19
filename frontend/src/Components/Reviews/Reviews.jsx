import React from 'react'
import './review.css'
import Revblock from './revblock'
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
