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
    tileWidth,
    boardWidth,
    bgImage,
    bgPos,
    showNumbers
  } = props

  // In order to skip the background image for the empty field,
  // we must look for it. But it is tricky, because the value 
  // was originally an empty string, was converted to number but 
  // without a real value. 
  // After the decrementation by 1 we have a value to compare with.
  const isLastPiece = val => val - 1 === -1 ? 'none' : bgImage

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
              bgImage={isLastPiece(val)}
              bgSize={`${boardWidth}px`}
              bgPos={bgPos[val - 1]}
              showNumbers={showNumbers}
            />
          )
        })}
      </Row>
    ))
  )
}