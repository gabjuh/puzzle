import React, { useState, useEffect } from 'react'

// Components
import Board from './Board'
import Button from './Button'
import Select from './Select'
import Checkbox from './Checkbox'
import ImageButton from './ImageButton'

// Helper functions
import { isUndefined, setTileNrsMatrix, isGameOver, 
  objToStr, getMixedMatrix, getEmptyFieldCoordsFromMatrix, 
  setBgPosInArray } from "./helpers";

// Constans
import { BOARDWIDTH, DEFAULT_SIZE } from './constants'
import { GAME_TITLE, INFO_TEXTS, BUTTON_TEXTS, LEVELS_TEXTS } from './texts'

// Image(s)
import bgImage1 from '../../src/data/red-squirrel.jpg'
import bgImage2 from '../../src/data/nyc2.jpg'
import bgImage3 from '../../src/data/guitar.jpg'
import bgImage4 from '../../src/data/rally.jpg'
import bgImage5 from '../../src/data/holland.jpg'

export default Puzzle = () => {

  // Numbers
  const [showNumbers, setShowNumbers] = useState(false)
  const toggleNumbers = () => setShowNumbers(!showNumbers)

  // Sizing board and tiles
  const [size, setSize] = useState(DEFAULT_SIZE)
  const tileWidth = BOARDWIDTH / size
  const DEFAULT_EMPTY_FIELD_COORDS = [size - 1, size - 1]

  // Empty field and clickable tiles
  const [emptyFieldCoords, setEmptyFieldCoords] = useState(DEFAULT_EMPTY_FIELD_COORDS)
  const [clickables, setClickables] = useState([])
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
 
  // Matrix
  const [matrix, setMatrix] = useState(setTileNrsMatrix(size))
  const [matrixCopy, setMatrixCopy] = useState(matrix)

  useEffect(() => {
    setMatrix(setTileNrsMatrix(size))
  }, [size])

  // Background positioning
  const backgroundPositions = setBgPosInArray(matrix, tileWidth)

  // Info texts
  const [info, setInfo] = useState(INFO_TEXTS.welcome)

  // Game current state
  const [isGameStarted, setIsGameStarted] = useState(false)

  useEffect (() => {
    refreshClickables()
    if (!isGameStarted) return
    if (isGameOver(objToStr(matrix), objToStr(matrixCopy))) setInfo(INFO_TEXTS.end)
  }, [matrix])

  // Background images
  const [bgImage, setBgImage] = useState(bgImage3)



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
            boardWidth={BOARDWIDTH}
            bgImage={bgImage}
            bgPos={backgroundPositions}
            showNumbers={showNumbers}
          />
        </thead>
      </table>
      <Button 
        text={BUTTON_TEXTS.start}
        fn={() => {
          let newMatrix = getMixedMatrix(size)
          setMatrix(newMatrix)
          setEmptyFieldCoords(getEmptyFieldCoordsFromMatrix(newMatrix))
          refreshClickables()
          setIsGameStarted(true)
          setInfo(INFO_TEXTS.start)
        }} 
      />
      <Button 
        text={BUTTON_TEXTS.reset}
        fn={() => {
          setMatrix(setTileNrsMatrix(size)) 
          setEmptyFieldCoords(DEFAULT_EMPTY_FIELD_COORDS)
          refreshClickables()
          setIsGameStarted(false)
          setInfo(INFO_TEXTS.reset)
        }}
      />
      <Select 
        options={LEVELS_TEXTS}
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
            const level = LEVELS_TEXTS.filter(x => x.value === newSize)
            return level[0].label, level[0].emoji
          })
        }}
      />
      <div className="imageButtonsBox">
        <ImageButton 
          bgImage={bgImage1}
          fn={() => setBgImage(bgImage1)}
        />
        <ImageButton 
          bgImage={bgImage2}
          fn={() => setBgImage(bgImage2)}
        />
        <ImageButton 
          bgImage={bgImage3}
          fn={() => setBgImage(bgImage3)}
        />
        <ImageButton 
          bgImage={bgImage4}
          fn={() => setBgImage(bgImage4)}
        />
        <ImageButton 
          bgImage={bgImage5}
          fn={() => setBgImage(bgImage5)}
        />
      </div>
      <Checkbox 
        label={BUTTON_TEXTS.showNr}
        showNumbers={showNumbers}
        handleChange={toggleNumbers}
      />
      <h2>{info}</h2>
    </>
  )
}
