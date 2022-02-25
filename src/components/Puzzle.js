import React, { useState, useEffect } from 'react'
import Board from './Board'
import Button from './Button'
import Select from './Select'
import Checkbox from './Checkbox'
// import levels from './levels'
import { clicked, isUndefined, setTileNrsMatrix, 
  isGameOver, objToStr, getMixedMatrix, getEmptyFieldCoordsFromMatrix, setBgPosInArray } from "./helpers";
import { BOARDWIDTH, DEFAULT_SIZE, GAME_OVER_TEXT } from './constants'
import { GAME_TITLE, infoTexts, buttonTexts, levelsTexts } from './texts'
import bgImage from '../../src/data/red-squirrel.jpg'

export default Puzzle = () => {

  const [size, setSize] = useState(DEFAULT_SIZE)

  const [boardWidth, setBoardWidth] = useState(BOARDWIDTH)

  const tileWidth = boardWidth / size

  const DEFAULT_EMPTY_FIELD_COORDS = [size - 1, size - 1]
 
  const [emptyFieldCoords, setEmptyFieldCoords] = useState(DEFAULT_EMPTY_FIELD_COORDS)
 
  const [clickables, setClickables] = useState([])
 
  const [matrix, setMatrix] = useState(setTileNrsMatrix(size))

  const [showNumbers, setShowNumbers] = useState(true)

  const toggleNumbers = () => {
    setShowNumbers(!showNumbers)
  }

  const backgroundPositions = setBgPosInArray(matrix, tileWidth)

  useEffect(() => {
    setMatrix(setTileNrsMatrix(size))
  }, [size])
   
  const [matrixCopy, setMatrixCopy] = useState(matrix)

  const [info, setInfo] = useState(infoTexts.welcome)

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

  return (
    <> 
      <h1>{GAME_TITLE}</h1>
      <table>
        <thead>
          <Board 
            matrix={matrix}
            size={size}
            clickables={clickables}
            emptyFieldCoords={emptyFieldCoords}
            setMatrix={setMatrix}
            setEmptyFieldCoords={setEmptyFieldCoords}
            tileWidth={tileWidth}
            boardWidth={boardWidth}
            bgImage={bgImage}
            bgPos={backgroundPositions}
            showNumbers={showNumbers}
          />
        </thead>
      </table>
      <Button 
        text={buttonTexts.start}
        fn={() => {
          let newMatrix = getMixedMatrix(size)
          setMatrix(newMatrix)
          setEmptyFieldCoords(getEmptyFieldCoordsFromMatrix(newMatrix))
          refreshClickables()
          setIsGameStarted(true)
          setInfo(infoTexts.start)
        }} 
      />
      <Button 
        text={buttonTexts.reset}
        fn={() => {
          setMatrix(setTileNrsMatrix(size)) 
          setEmptyFieldCoords(DEFAULT_EMPTY_FIELD_COORDS)
          refreshClickables()
          setIsGameStarted(false)
          setInfo(infoTexts.reset)
        }}
      />
      <Select 
        options={levelsTexts}
        defaultValue={size}
        fn={newSize => {
          newSize = parseInt(newSize)
          let newMatrix = setTileNrsMatrix(newSize)
          setSize(newSize)
          setMatrix(newMatrix) 
          setEmptyFieldCoords(getEmptyFieldCoordsFromMatrix(newMatrix))
          refreshClickables()
          setIsGameStarted(false)
          setMatrixCopy(newMatrix)
          setInfo(() => {
            const level = levelsTexts.filter(x => x.value === newSize)
            return level[0].label, level[0].emoji
          })
        }}
      />
      <Checkbox 
        label={buttonTexts.showNr}
        showNumbers={showNumbers}
        handleChange={toggleNumbers}
      />
      <h2>{info}</h2>
    </>
  )
}
