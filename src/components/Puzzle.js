import React, { useState, useEffect } from 'react'
import Board from './Board'
import Button from './Button'
import Select from './Select'
import { startGame, resetGame } from './helpers'
import levels from './levels'
import { clicked, isUndefined, setTileNrsMatrix } from "./helpers";
import { BOARDWIDTH, DEFAULT_SIZE } from './constants'


export default Puzzle = () => {

  const [size, setSize] = useState(DEFAULT_SIZE)

  const [boardWidth, setBoardWidth] = useState(BOARDWIDTH)

  const tileWidth = boardWidth / size

  const [emptyFieldCoords, setEmptyFieldCoords] = useState([size - 1, size - 1])

  const [clickables, setClickables] = useState([])

  const [matrix, setMatrix] = useState(setTileNrsMatrix(size))

  useEffect(() => {
    setMatrix(setTileNrsMatrix(size))
  }, [size])
  
  const [referenzMatrix, setRefenerzMatrix] = useState(matrix)

  const refreshClickables = () => {
    let clickablesArray = []
    
    const [x, y] = emptyFieldCoords

    const above = [x - 1, y]
    const below = [x + 1, y]
    const left  = [x, y - 1]
    const right = [x, y + 1]

    clickablesArray.push(
      isUndefined(above, size), 
      isUndefined(below, size), 
      isUndefined(left, size), 
      isUndefined(right, size)
    )

    setClickables(clickablesArray.filter(e => e))
  }

  useEffect (() => {
    refreshClickables()
  }, [matrix])

  

  const [prevShuffledTileValue, setPrevShuffledTileValue] = useState(0)

  const getOtherRandomTile = () => {
    const random = clickables[Math.floor(Math.random() * clickables.length)]
    const randomValue = matrix[random[0]][random[1]]
    if (prevShuffledTileValue === randomValue) return getOtherRandomTile()
    return random
  }

  const shuffleTiles = () => {
    [...Array(1)].forEach((_, i) => {

      const [x, y] = getOtherRandomTile() 
      const value = matrix[x][y]
      setPrevShuffledTileValue(value)
      
      // console.log(i)

      clicked(
        value,
        x, y, 
        clickables, 
        matrix, 
        emptyFieldCoords, 
        setMatrix, 
        setEmptyFieldCoords
      )
    }) 
  }

  return (
    <> 
      <table>
        <thead>
          <Board 
            matrix={matrix}
            size={size}
            clickables={clickables}
            emptyFieldCoords={emptyFieldCoords}
            setMatrix={setMatrix}
            setEmptyFieldCoords={setEmptyFieldCoords}
            onClickFn={clicked}
            tileWidth={tileWidth}
          />
        </thead>
      </table>
      <Button 
        text={'Start Game'}
        fn={() => {
          shuffleTiles()
          // console.log([...clickables])
        }} //startGame(size)}
      />
      <Button 
        text={'Reset'}
        fn={() => resetGame()}
      />
      <Select 
        options={levels}
        defaultValue={3}
        fn={() => console.log('bla')}
      />
    </>
  )
}
