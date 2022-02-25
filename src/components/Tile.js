import React, { useRef } from "react";

export default Tile = props => {

  const tileRef = useRef()

  const {
    number, 
    tileWidth, 
    bgImage, 
    bgSize, 
    bgPos,
    showNumbers,
  } = props
  
  const showNumbersIfTrue = () => showNumbers ? 1 : 0

  const tileHeight = tileWidth * 0.8

  return (
    <td
      ref={tileRef}
      key={number}
      onClick={props.clicked}
      style={{
        width: tileWidth,
        height: tileHeight,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: bgSize,
        backgroundPosition: bgPos,
      }}
    >
      <span
        style={{
          opacity: showNumbersIfTrue()
        }}
      >{number}</span>
    </td>
  )
}
