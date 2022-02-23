import React, { useState, useEffect } from 'react'
import Board from './Board'
import Button from './Button'
import Select from './Select'
import levels from './levels'
import { clicked, isUndefined, setTileNrsMatrix, 
  isGameOver, objToStr } from "./helpers";
import { BOARDWIDTH, DEFAULT_SIZE, GAME_OVER_TEXT } from './constants'

export default Puzzle = () => {

  const [size, setSize] = useState(DEFAULT_SIZE)

  const [boardWidth, setBoardWidth] = useState(BOARDWIDTH)

  const tileWidth = boardWidth / size

  const DEFAULT_EMPTY_FIELD_COORDS = [size - 1, size - 1]

  // ?
  const [emptyFieldCoords, setEmptyFieldCoords] = useState(DEFAULT_EMPTY_FIELD_COORDS)

  // ?
  const [clickables, setClickables] = useState([])

  // ?
  const [matrix, setMatrix] = useState(setTileNrsMatrix(size))

  useEffect(() => {
    setMatrix(setTileNrsMatrix(size))
  }, [size])
  
  // ?
  const [matrixCopy, setMatrixCopy] = useState(matrix)

  const [info, setInfo] = useState('')

  const [isGameStarted, setIsGameStarted] = useState(false)

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
    if (!isGameStarted) return
    if (isGameOver(objToStr(matrix), objToStr(matrixCopy))) setInfo(GAME_OVER_TEXT)
  }, [matrix])

  const [prevShuffledTileValue, setPrevShuffledTileValue] = useState(0)

  const getOtherRandomTile = () => {
    const random = clickables[Math.floor(Math.random() * clickables.length)]
    const randomValue = matrix[random[0]][random[1]]
    if (prevShuffledTileValue === randomValue) return getOtherRandomTile()
    return random
  }

  const shuffleTiles = () => {
    [...Array(1)].forEach(() => {

      const [x, y] = getOtherRandomTile() 
      const value = matrix[x][y]
      setPrevShuffledTileValue(value)

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
          setIsGameStarted(true)
        }} 
      />
      <Button 
        text={'Reset'}
        fn={() => {
          setMatrix(setTileNrsMatrix(size)) 
          setEmptyFieldCoords(DEFAULT_EMPTY_FIELD_COORDS)
          refreshClickables()
          setIsGameStarted(false)
          setInfo('')
        }}
      />
      <Select 
        options={levels}
        defaultValue={size}
        fn={setSize}
      />
      <h2>{info}</h2>
    </>
  )
}
