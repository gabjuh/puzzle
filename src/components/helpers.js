// Create a matrix in given size, filled with growing numbers, 
// and the last field ist an empty string ''
export const setTileNrsMatrix = (size) => {
  const matrix = Array.from(new Array(size).fill(0).keys()).map((y, j) => 
    Array.from(new Array(size).fill(0).keys()).map((x, i) => {
      let nr = y * size + x + 1
      return nr === size ** 2  ? '' : nr
    })
  )
  return matrix
}

// Get random number between min and max (both inkl.)
const getRandomNr = (min, max) => Math.floor(Math.random() * (max - min) + min)

// Create a new matrix and shuffle the tiles in 2x2 blocks in random times,
// and across the board on random places, btw. 200 and 500 times.
export const getMixedMatrix = (size) => {
  let matrix = setTileNrsMatrix(size);

  [...Array(getRandomNr(200, 500))].forEach(() => {
    const coord = [
      getRandomNr(size - 1, 0), 
      getRandomNr(size - 1, 0)
    ];
  
    [...Array(getRandomNr(4, 1))].forEach(() => {
      
      // Id-s of the mixing direction:
      //           1  →  2
      //           ↑     ↓
      //           4  ←  3
      // This idea is crutial in order to keep the party solveable.
  
      let one = matrix[coord[0]][coord[1]]
      let two = matrix[coord[0]][coord[1] + 1]
      let three = matrix[coord[0] + 1][coord[1] + 1]
      let four = matrix[coord[0] + 1][coord[1]]
      
      let puffer = one

      // Not the best solution, but it prevents, that the tiles are 
      // shuffled without the empty field. So without it the party 
      // wont be nessecarely solvable.
      if (one && two && three && four != '') return
  
      matrix[coord[0]][coord[1]]          = two
      matrix[coord[0]][coord[1] + 1]      = three
      matrix[coord[0] + 1][coord[1] + 1]  = four
      matrix[coord[0] + 1][coord[1]]      = puffer
    })
  })
  return matrix
}

// "Moves" the clicked tile - it will actually replaced with the empty field.
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

// Filters the coords of the empty field (after mixing)
export const getEmptyFieldCoordsFromMatrix = (matrix) => {
  let coords = []
  matrix.forEach((row, x) => {
    row.forEach((val, y) => {
      if (val === '') coords = [x, y]
    })
  })
  return coords
}

// In order to set the bg image to every tile correctly, it saves
// every each positions in an array, except the empty one of course
export const setBgPosInArray = (matrix, tileWidth) => {  
  let positions = []
  let coords = [0, 0]

  matrix.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (isNaN(tile)) return 
      positions.push(`${coords[0] - tileWidth * j}px ${coords[1] - tileWidth * i}px`)
    })
  })
  return positions.slice(0, -1)
}

export const isUndefined = (coords, size) => {
  const [x, y] = coords
  if (x >= 0 && x < size && y >= 0 && y < size) return coords
}

export const objToStr = obj => JSON.stringify(obj)

export const isGameOver = (origMatrix, refMatrix) => origMatrix === refMatrix