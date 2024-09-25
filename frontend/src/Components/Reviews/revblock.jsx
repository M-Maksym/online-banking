import React from 'react';
import './review.css';

export default function Revblock({ image, name, text }) {
  return (
    <div className='revblockcontainer'>
      <div className="headblock">
        <div className="revpart1">
          <img src={image} alt="" className="revava" />
        </div>

        <div className="revpart2">
          <h2 className='revName'>{name}</h2>
          <div className="stars">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
          </div>
        </div>
      </div>
      <div className="revdescription">
        <p className="revtext">
          {text}
        </p>
      </div>
    </div>
  );
}
