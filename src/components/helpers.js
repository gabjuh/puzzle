export const clicked = (val, i, j, clickables, matrix, 
  emptyFieldCoords, setMatrix, setEmptyFieldCoords) => {
  console.log(val)
  clickables.forEach(coords => {
    const [x, y] = coords
    if (val === matrix[x][y]) {
      const copy = [...matrix]
      // console.log(matrix)
      // console.log(val)
      copy[i][j] = ''
      copy[emptyFieldCoords[0]][emptyFieldCoords[1]] = val
      setMatrix(copy)
      setEmptyFieldCoords([i, j])
    }
  })
}

// export const shuffleTileNrsArray = arr =>  arr.map(x => 
//   [Math.random(), x]).sort(([a], [b]) => a - b).map(([_, x]) => x)

// export const generateNrsArray = nr => 
  // Array(nr).fill(0).map((_, i) => i + 1)

// export const startGame = (difficulty) => {
//   console.log('game started')
//   setTileNrsMatrix(difficulty, shuffleTileNrsArray, true)
// }

export const resetGame = () => {
  console.log('reset game')
}

// export const setValueNullIfUndefined = (coord, equalTo) => coord === equalTo ? 0 : coord

export const setSelected = (val, defVal) => 
  val === defVal ? 'selected' : ''

export const isUndefined = (coords, difficulty) => {
  const [x, y] = coords
  if (x >= 0 && x < difficulty && y >= 0 && y < difficulty) return coords
}

export const setTileNrsMatrix = (difficulty, shuffledNrsArray, shuffle = false) => {
  const matrix = Array.from(new Array(difficulty).fill(0).keys()).map((y, j) => 
    Array.from(new Array(difficulty).fill(0).keys()).map((x, i) => {
      let nr = y * difficulty + x + 1
      if (shuffle === false) return nr === difficulty ** 2  ? '' : nr

      nr = shuffledNrsArray[nr - 1]
      return nr
    })
  )
  
  return matrix
}
