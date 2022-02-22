import React, { useRef } from "react";

export default Tile = props => {

  const tileRef = useRef()

  const {number, tileWidth } = props

  return (
    <td
      ref={tileRef}
      key={number}
      onClick={props.clicked}
      style={{minWidth: tileWidth}}
    >
      {number}
    </td>
  )
}