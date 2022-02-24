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

export const setTileNrsMatrix = (size) => {
  const matrix = Array.from(new Array(size).fill(0).keys()).map((y, j) => 
    Array.from(new Array(size).fill(0).keys()).map((x, i) => {
      let nr = y * size + x + 1
      return nr === size ** 2  ? '' : nr
    })
  )
  return matrix
}

const getRandomNr = (min, max) => Math.floor(Math.random() * (max - min) + min)

export const getMixedMatrix = (size) => {
  let matrix = setTileNrsMatrix(size);

  [...Array(getRandomNr(60, 40))].forEach(() => {
    const coord = [
      getRandomNr(size - 1, 0), 
      getRandomNr(size - 1, 0)
    ];
  
    [...Array(getRandomNr(4, 1))].forEach(() => {
  
      // Id-s of the mixing direction
      // 1  →  2
      // ↑     ↓
      // 4  ←  3
  
      let one = matrix[coord[0]][coord[1]]
      let two = matrix[coord[0]][coord[1] + 1]
      let three = matrix[coord[0] + 1][coord[1] + 1]
      let four = matrix[coord[0] + 1][coord[1]]
      
      let puffer = one
  
      matrix[coord[0]][coord[1]]          = two
      matrix[coord[0]][coord[1] + 1]      = three
      matrix[coord[0] + 1][coord[1] + 1]  = four
      matrix[coord[0] + 1][coord[1]]      = puffer
    })
  })
  return matrix
}

export const getEmptyFieldCoordsFromMatrix = (matrix) => {
  let coords = []
  matrix.forEach((row, x) => {
    row.forEach((val, y) => {
      if (val === '') coords = [x, y]
    })
  })
  return coords
}
