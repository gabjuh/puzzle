import React from 'react'

export default ImageButton = props => {
  
  return (
    <button 
      type="button" 
      className="imageButton" 
      onClick={props.fn}
      style={{
        backgroundImage: `url(${props.bgImage})`
      }}
    ></button>
  )
}