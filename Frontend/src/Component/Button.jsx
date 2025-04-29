import React from 'react'
import './Button.css'
function Button({props}) {
  return (
    <div>
      <button className='glow-button'>{props}</button>
    </div>
  )
}

export default Button
