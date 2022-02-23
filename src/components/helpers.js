export const clicked = (val, i, j, clickables, matrix, 
  emptyFieldCoords, setMatrix, setEmptyFieldCoords) => {

  clickables.forEach(coords => {
    const [x, y] = coords
    if (val === matrix[x][y]) {
      const copy = [...matrix]
      copy[i][j] = ''
      copy[emptyFieldCoords[0]][emptyFieldCoords[1]] = val
      setMatrix(copy)
      setEmptyFieldCoords([i, j])
    }
  })
}

export const isUndefined = (coords, size) => {
  const [x, y] = coords
  if (x >= 0 && x < size && y >= 0 && y < size) return coords
}

export const objToStr = obj => JSON.stringify(obj)

export const isGameOver = (origMatrix, refMatrix) => origMatrix === refMatrix

export const setTileNrsMatrix = (size, shuffledNrsArray, shuffle = false) => {
  const matrix = Array.from(new Array(size).fill(0).keys()).map((y, j) => 
    Array.from(new Array(size).fill(0).keys()).map((x, i) => {
      let nr = y * size + x + 1
      if (shuffle === false) return nr === size ** 2  ? '' : nr

      nr = shuffledNrsArray[nr - 1]
      return nr
    })
  )
  
  return matrix
}
