import React, { useRef } from "react";

export default Tile = props => {

  const tileRef = useRef()

  const {
    number, 
    tileWidth, 
    bgImage, 
    bgSize, 
    bgPosition
  } = props

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
        backgroundPosition: bgPosition,
      }}
    >
      {number}
    </td>
  )
}
