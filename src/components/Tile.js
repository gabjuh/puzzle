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

  return (
    <td
      ref={tileRef}
      key={number}
      onClick={props.clicked}
      style={{
        minWidth: tileWidth,
        width: tileWidth,
        height: tileWidth,
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
