import React from "react";
import Row from './Row'
import Tile from './Tile'
import { clicked } from "./helpers";

export default Board = props => {

  const {
    matrix, 
    size, 
    clickables,
    emptyFieldCoords,
    setMatrix,
    setEmptyFieldCoords,
    tileWidth} = props

  return (
    matrix.map((m, i) => (
      <Row key={i}>
        {m.map((val, j) => {      
          return (
            <Tile 
              key={i * size + j}
              number={val} 
              clicked={() => clicked(
                val, 
                i, j,
                clickables,
                matrix,
                emptyFieldCoords,
                setMatrix,
                setEmptyFieldCoords)}
              tileWidth={tileWidth}
            />
          )
        })}
      </Row>
    ))
  )
}