document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  // const gamelayout = document. querySelector('.game')

  function createGrid(x) {
    for (let i = 0; i < x; i++) {
      const div = document.createElement('div')
      div.classList.add('gridSquare')
      grid.appendChild(div)
    }
  }
  createGrid(400)

  const gridSquare = document.querySelectorAll('.gridSquare')

  let pacIndex = 21
  const width = 20

  gridSquare[21].classList.add('pacman')
  gridSquare[64].classList.add('food')

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

    gridSquare[pacIndex].classList.add('pacman')
  }

  document.addEventListener('keydown', movePacMan)

  // Preventing arrow keys from scrolling ---------------------------
  document.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
  }, false)
  // creating walls within the grid --------------------------

  // ASSIGN A CLASS A NUMBER.
  // empty = 0
  // wall = 1

  const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1,
    1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1,
    1, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 1,
    1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1,
    1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  function assignGrid() {
    for (let i = 0; i < layout.length; i++) {
      if (layout[i] === 1) {
        gridSquare[i].classList.add('wall')
      } else if (layout[i] === 2) {
        gridSquare[i].classList.add('food')
      }
    }
  }
  assignGrid()

  let ghostOneIndex = 170
  gridSquare[ghostOneIndex].classList.add('ghostOne')
  // I want to check which direction I can move in
  const directions = [-1, -width, 1, width]
  // directions --- left, up, right, down
  let goodDirections = []
  const directionStore = []
  // let directionMove
  let directionMove = -1
  let lastDirection = 0
  // start---------------------------------------------------
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

    // CHOOSING FROM POSSIBLE DIRECTIONS
    // random
    // directionMove = goodDirections[Math.floor(Math.random()*goodDirections.length)]

    //towards PacMan
    if (pacIndex < ghostOneIndex) {
      for(let j = 0; j < goodDirections.length; j++) {
        if (goodDirections[j] < directionMove) {
          directionMove = goodDirections[j]
        } else {
          directionMove = goodDirections[Math.floor(Math.random()*goodDirections.length)]
        }
      }
    } else if (pacIndex > ghostOneIndex) {
      for(let k = 0; k < goodDirections.length; k++) {
        if (goodDirections[k] > directionMove) {
          directionMove = goodDirections[k]
        } else {
          directionMove = goodDirections[Math.floor(Math.random()*goodDirections.length)]
        }
      }
    }

    // for(let j = 0; j < goodDirections.length; j++) {
    //   if (pacIndex < ghostOneIndex && directionMove > goodDirections[j]) {
    //     directionMove = goodDirections[j]
    //   } else if (pacIndex > ghostOneIndex && directionMove < goodDirections[j]) {
    //     directionMove = goodDirections[j]
    //   } else {
    //     directionMove = goodDirections[Math.floor(Math.random()*goodDirections.length)]
    //   } // Issue if pac man is inline to the right and down is an apotion the ghost will choose down as it is a higher number
    // }
    //STORES ALL PREVIOUS MOVES
    directionStore.push(directionMove)

    //STORES LAST DIRECTION TO NOT GO BACK ONITSELF
    lastDirection = directionStore[directionStore.length-1]

    // MOVES THE CLASS TO NEXT CHOSEN SQUARE
    gridSquare[ghostOneIndex].classList.remove('ghostOne')
    ghostOneIndex = ghostOneIndex + directionMove
    gridSquare[ghostOneIndex].classList.add('ghostOne')
  }
  setInterval(chooseAndMove, 250)




})
