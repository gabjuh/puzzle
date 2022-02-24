import React, { useRef } from "react";

export default Tile = props => {

  const tileRef = useRef()

  const {
    number, 
    tileWidth, 
    bgImage, 
    bgSize, 
    bgPos,
    // lastPiece, test
  } = props

  // const setNoneIfLastPiece = (cssProp) => lastPiece ? 'none' : cssProp  


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
      {number}
    </td>
  )
}
