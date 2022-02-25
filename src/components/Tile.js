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

  // This is a weak trying to get rid of the ugly margin of the 
  // last raw/column.. Somehow there is a line of some pixels,
  // and the bg can not cover it. That's why I decreased the height
  // of the tiles. The tiles fit better to each other, and this 
  // line became tinier to, but I can not get rid of it. 🤷🏻‍♂️
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
