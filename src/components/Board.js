import React, { useState } from "react";
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
    bgImage,
    boardWidth
  } = props

  let pos = [0, 0]
  
  const getBackgroundPosition = (i, j) => 
    `${pos[0] - tileWidth * j}px ${pos[1] - tileWidth * i}px`

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
              bgImage={bgImage}
              bgSize={`${boardWidth}px`}
              bgPosition={getBackgroundPosition(i, j)}
            />
          )
        })}
      </Row>
    ))
  )
}


// import bgImage from '../../src/data/red-squirrel.jpg'



// import React from 'react'
// import { swapTiles } from './swapTiles'

// export const Tile = props => { 

//   const {nr, bgImage, bgSize, bgPosition, 
//     tileWidth, fontSize, divRef, emptyField} = props
  
//   const showTileNumbers = () => 
//     props.showNrs === false ? 'none' : 'inline-block'

//   return (
//     <div data-tile={nr}
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: bgSize,
//         backgroundPosition: bgPosition,
//         width: tileWidth,
//         height: tileWidth,
//         fontSize: fontSize,
//       }}
//       ref={divRef}
//       onClick={(event) => swapTiles(event, emptyField)}
//       >
//       <span style={{
//           paddingTop: `${tileWidth / 2 - fontSize / 2}px`,
//           display: `${showTileNumbers()}`
//         }}>
//       {props.nr}
//       </span>
//     </div>
//   )
// }



// BOARD

//   const {difficulty, boardWidth, fontSize} = props

//   const tileWidth = boardWidth / difficulty
//   let key = 0
//   let pos = [tileWidth, tileWidth]

// !!!!!
//   const setBackgroundPosition = axis => {
//     if (axis === 'x') pos[0] = pos[0] - tileWidth
//     if (axis === 'y') pos[1] = pos[1] - tileWidth
//   }
  
//   const getBackgroundPosition = () => `${pos[0]}px ${pos[1]}px`
// !!!!!

// TILE
//       <Tile 
//         bgImage={props.bgImg}
//         bgSize={`${boardWidth}px`}
//         bgPosition={getBackgroundPosition()}
//         tileWidth={tileWidth}
//         showNrs={props.showNrs}
//         nr={key}
//         fontSize={fontSize}
//         divRef={ref}
//         emptyField={emptyField}
//       />


//   return (
//     <table>
//       <tbody>
//         {rows.map(tiles => {
//           setBackgroundPosition('y')
//           return ( 
//           <tr> 
//             {tiles.map(() => {
//               key += 1
//               if (isLastTile(key)) return <td data-id={`${nrOfTiles()}`}></td> //data-key={`${nrOfTiles()}`}
//               setBackgroundPosition('x')
//               return (
//                 <td 
//                   data-id={key}>
//                   {getTileBlock(tileRefs.current[key - 1])}
//                 </td>
//               )
//             })}
//           </tr> )
//         })}
//       </tbody>
//     </table>
//   )
  
// }
