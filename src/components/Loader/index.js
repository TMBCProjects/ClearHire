import React from 'react'
import './main.css'
const index = ({text,color,textColor}) => {
  return (<div
    className='spinner-container'
    style={color &&{
        background:color
    }}
    >

    <div className="spinner"></div>
    <p  style={textColor && {
        color:textColor
    }}>
    {text}
    </p>
    </div>
  )
}

export default index