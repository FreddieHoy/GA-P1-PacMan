
// -------------------------- TO DO LIST ----------------
// Vital --------------
// fix ghost loop
//
// score
// a little bit of CSS
// timer
// 3 more ghosts - using constructors functions???
// pilll that reverses ghost direction
//
//
// BONUS ---------------
// warp whole drops you at other side of the map.
// fruit points
//
//
const width = 20
let pacIndex = 21
let ghostOneIndex = 170

// Ghost moving directions. directions --- left, up, right, down
const directions = [-1, -width, 1, width]
// Possible moves for ghost
let goodDirections = []
// Possible Index Positions for ghost
let goodPositions = []

//storing ghost past moves
let directionStore = []
// chosen direction to move ghost (inital start)
let directionMove = -1
// chosen Index position to move ghost
let positionMove
// the last direction used by ghost one.
let lastDirection = 0

// creating the grid ------------------------------------
// ASSIGN A CLASS A NUMBER.
// empty = 0
// wall = 1
// pacman = 3
// ghosts = 4

const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1,
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1,
  1, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 1,
  1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 4, 0, 0, 1, 2, 1, 2, 1, 2, 1,
  1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1,
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]




document.addEventListener('DOMContentLoaded', () => {

  // Change in the HTML --------------------------------------------------
  const grid = document.querySelector('.grid')

  function createGrid(x) {
    for (let i = 0; i < x; i++) {
      const div = document.createElement('div')
      div.classList.add('gridSquare')
      grid.appendChild(div)
    }
  }
  createGrid(400)

  // Finding the dom ------------------------------------------------------------
  const gridSquare = document.querySelectorAll('.gridSquare')

  document.addEventListener('keydown', movePacMan)
  document.addEventListener('keydown', preventDefultScroll)

  function assignGrid() {
    for (let i = 0; i < layout.length; i++) {
      if (layout[i] === 1) {
        gridSquare[i].classList.add('wall')
      } else if (layout[i] === 2) {
        gridSquare[i].classList.add('food')
      } else if (layout[i] === 3) {
        gridSquare[i].classList.add('pacman')
      } else if (layout[i] === 4) {
        gridSquare[i].classList.add('ghostOne')
        ghostOneIndex = i
      }
    }
  }
  assignGrid()

  //------------------ MOVING PacMan -----------------------------
  function movePacMan(e) {
    gridSquare[pacIndex].classList.remove('pacman')
    switch(e.keyCode) {
      case 37: // left arrow
        if (gridSquare[pacIndex-1].classList.contains('wall')) pacIndex += 0
        else if(pacIndex % width !== 0) pacIndex -= 1
        break
      case 38: // upp arrow
        if (gridSquare[pacIndex-width].classList.contains('wall')) pacIndex += 0
        else if(pacIndex - width >= 0) pacIndex -= width
        break
      case 39: // right arrow
        if (gridSquare[pacIndex + 1].classList.contains('wall')) pacIndex += 0
        else if(pacIndex % width < width - 1) pacIndex += 1
        break
      case 40: //down arrow
        if (gridSquare[pacIndex+width].classList.contains('wall')) pacIndex += 0
        else if(pacIndex + width < width * width) pacIndex += width
        break
    }
    // ---------- colliding with BONE ------
    if(gridSquare[pacIndex].classList.contains('food')) {
      gridSquare[pacIndex].classList.remove('food')
    }
    if(gridSquare[pacIndex] === gridSquare[ghostOneIndex]) {
      pacDied()
      // The game currently resets itsself 5 seconds after pacman dies
      setTimeout(reset, 5000)
    }
    gridSquare[pacIndex].classList.add('pacman')
  }

  // Preventing arrow keys from scrolling ---------------------------
  function preventDefultScroll(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
  }

  // Ghost lodgic -------------------------------------------------
  function chooseAndMove() {
    //  EVALUATES ALL THE CHOICES DONT CHOOSE WALL OR BACK ON ITS SELF
    goodDirections = []
    for(let i = 0; i <directions.length; i++) {
      if (gridSquare[ghostOneIndex + directions[i]].classList.contains('wall')) {
        goodDirections.push(null)
      } else if (directions[i] === -lastDirection) {
        goodDirections.push(null)
      } else {
        goodDirections.push(directions[i])
      }
    }
    goodDirections = goodDirections.filter(x => x !== null)
    console.log(goodDirections)
    //towards PacMan
    const goodPositions = goodDirections.map(x => x + ghostOneIndex)
    console.log(goodPositions)

    // beacuse of these two lines of code - it actually follows PacMan---------
    // the ghost takes an array of possible options to move and
    // then chooses the one that is closes to the value of PacMan
    positionMove = goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - pacIndex) < Math.abs(prev - pacIndex) ? curr : prev)
    })

    console.log(positionMove)
    //this find the change of index so that it is not repeated
    directionMove = positionMove - ghostOneIndex
    //STORES ALL PREVIOUS MOVES
    directionStore.push(directionMove)
    //STORES LAST DIRECTION TO NOT GO BACK ONITSELF
    lastDirection = directionStore[directionStore.length-1]
    // MOVES THE CLASS TO NEXT CHOSEN SQUARE
    gridSquare[ghostOneIndex].classList.remove('ghostOne')
    ghostOneIndex = ghostOneIndex + directionMove
    gridSquare[ghostOneIndex].classList.add('ghostOne')
  }
  const ghostMoveId = setInterval(chooseAndMove, 250)

  function pacDied() {
    clearInterval(ghostMoveId)
    pacIndex = null
  }

  function reset() {
    pacIndex = 21
    directionStore = []
    goodDirections = []
    directionMove = -1
    lastDirection = 0
    gridSquare[ghostOneIndex].classList.remove('ghostOne')
    ghostOneIndex = 170
    resetGrid()
    //restart ghosts moving
    setInterval(chooseAndMove, 250)
  }

  function resetGrid() {
    //replace all clasess to orginal divs
    assignGrid()
    //restart ghost memory
  }


})
