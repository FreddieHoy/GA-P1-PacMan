
// -------------------------- TO DO LIST ----------------
// Vital --------------
//
// - Talk about catching pacman -- maybe limiting the speed of pac man changes method of getting caught.
// - killing ghosts misses them sometimes..
//
// - 3 more ghosts - using constructors functions???
//
//  CSS -------
// Make it look less shit 
// Trasitions
// ghost change color when pill is taken
// little icons for ghosts
// slowpac man but using transistion
// food and pills icon
//
//
//
// BONUS ---------------
// warp whole drops you at other side of the map.
// fruit points
//
//
const width = 20
let pacIndex = 21
let ghostIndex = 170
// Ghost moving directions. directions --- left, up, right, down
const directions = [-1, -width, 1, width]
// Possible moves for ghost
let goodDirections = []
// Possible Index Positions for ghost
// const goodPositions = []
//storing ghost past moves
let directionStore = []
// chosen direction to move ghost (inital start)
let directionMove = -1
// chosen Index position to move ghost
let positionMove
// the last direction used by ghost one.
let lastDirection = 0
// The score
let scoreNumber = 0
// The timer played
let time = 0
// Bias determins the way the ghosts run 1 towards, 2 awayfrom.
let bias = 1

// creating the grid ------------------------------------
// ASSIGN A CLASS A NUMBER.
// empty = 0
// wall = 1
// pacman = 3
// ghosts = 4
// pill = 5
// WARP = 6

const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 3, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1,
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1,
  1, 0, 6, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 2, 6, 0, 1,
  1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 4, 0, 1, 1, 1, 1, 2, 1, 1, 1,
  1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  1, 2, 1, 2, 5, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 5, 2, 1, 2, 1,
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
  const infoBox = document.querySelector('.infoBox')
  const score = document.querySelector('.score')
  const timer = document.querySelector('.timer')

  document.addEventListener('keydown', movePacMan)
  document.addEventListener('keydown', preventDefultScroll)

  function assignGrid() {
    infoBox.innerHTML = 'Here we go!'
    for (let i = 0; i < layout.length; i++) {
      if (layout[i] === 1) {
        gridSquare[i].classList.add('wall')
      } else if (layout[i] === 2) {
        gridSquare[i].classList.add('food')
      } else if (layout[i] === 3) {
        gridSquare[i].classList.add('pacman')
      } else if (layout[i] === 4) {
        gridSquare[i].classList.add('ghostOne')
        ghostIndex = i
      } else if (layout[i] === 5) {
        gridSquare[i].classList.add('pill')
      } else if (layout[i] === 6) {
        gridSquare[i].classList.add('warp')
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
    // colliding with food -----------------------
    if(gridSquare[pacIndex].classList.contains('food')) {
      gridSquare[pacIndex].classList.remove('food')
      scoreNumber = scoreNumber + 10
      score.innerHTML = scoreNumber
    }
    // POSSIBLE TO KILL PACMAN - MAYBE WHEN I SLOW HIM
    // if(gridSquare[pacIndex] === gridSquare[ghostIndex]) {
    //   pacDied()
    //   // The game currently resets itsself 5 seconds after pacman dies
    //   setTimeout(reset, 5000)
    // }
    gridSquare[pacIndex].classList.add('pacman')
    // colliding with pill ------------------------------------------
    if(gridSquare[pacIndex].classList.contains('pill')) {
      gridSquare[pacIndex].classList.remove('pill')
      pilltaken()

    }
    if (pacIndex === 141) {
      gridSquare[pacIndex].classList.remove('pacman')
      pacIndex = 157
      gridSquare[pacIndex].classList.add('pacman')
    }
    if (pacIndex === 158) {
      gridSquare[pacIndex].classList.remove('pacman')
      pacIndex = 142
      gridSquare[pacIndex].classList.add('pacman')
    }
  }
  // Preventing arrow keys from scrolling ---------------------------
  function preventDefultScroll(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
  }

  //-----------------END OF MOVING PACMAN -------------------------------

  // -------------------- GHOST LOGIC  -----------------------------------------------

  function chooseAndMove(/* THIS CAN BE GHOST1 GHOST2 ETC.. */) {
    //  EVALUATES ALL THE CHOICES DONT CHOOSE WALL OR BACK ON ITS SELF

    goodDirections = []
    for(let i = 0; i < directions.length; i++) {
      if (gridSquare[ghostIndex + directions[i]].classList.contains('wall')) {
        goodDirections.push(null)
      } else if (gridSquare[ghostIndex + directions[i]].classList.contains('warp')) {
        goodDirections.push(null)
      } else if (directions[i] === -lastDirection) {
        goodDirections.push(null)
      } else {
        goodDirections.push(directions[i])
      }
    }
    goodDirections = goodDirections.filter(x => x !== null)
    // THIS LOOKS AT ALL THE POSSIBLE DIRECTIONS TO MAKE AND CHOOSES THE BEST ONE
    //towards PacMan

    pacManBias(goodDirections)
    makeTheMove(positionMove)
    console.log(pacIndex)
  }
  let ghostMoveId = setInterval(chooseAndMove, 150)

  function makeTheMove(positionMove) {
    //this find the change of index so that it is not repeated
    directionMove = positionMove - ghostIndex
    //STORES ALL PREVIOUS MOVES
    directionStore.push(directionMove)
    //STORES LAST DIRECTION TO NOT GO BACK ONITSELF
    lastDirection = directionStore[directionStore.length-1]
    // MOVES THE CLASS TO NEXT CHOSEN SQUARE
    gridSquare[ghostIndex].classList.remove('ghostOne')
    ghostIndex = ghostIndex + directionMove
    gridSquare[ghostIndex].classList.add('ghostOne')
    // if(gridSquare[ghostIndex].classList.contains('pacman')) {
  }


  // ------------------- pac move direction BIAS ----------------
  function towardsPacMan(array) {
    const goodPositions = array.map(x => x + ghostIndex)

    // the ghost takes an array of possible options to move and
    // then chooses the one that is closes to the value of PacMan
    const closestIndex = goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - pacIndex) < Math.abs(prev - pacIndex) ? curr : prev)
    })
    // Pacs Modulas
    const pacModulas = pacIndex % width
    // This takes the possble indexs to move to and chnages them to modulas% width.
    const posPositionsModulas = goodPositions.map(x => x % width)
    // This then finds the modulas closest to the modulas of Pacman
    // []
    const closestModulas = posPositionsModulas.reduce(function(prev, curr) {
      return (Math.abs(curr - pacModulas) < Math.abs(prev - pacModulas) ? curr : prev)
    })
    const closestModulasIndex = posPositionsModulas.findIndex(x => x === closestModulas)
    const closestModulasREAL = goodPositions[closestModulasIndex]
    const idealmoves = [closestIndex, closestModulasREAL]
    positionMove = idealmoves[Math.floor(Math.random() * idealmoves.length)]
    return positionMove
  }
  function awayFromPacMan(array) {
    const goodPositions = array.map(x => x + ghostIndex)
    positionMove = goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - pacIndex) > Math.abs(prev - pacIndex) ? curr : prev)
    })
    return positionMove
  }
  function outOfBox(array) {
    const goodPositions = array.map(x => x + ghostIndex)
    positionMove = goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - 111) < Math.abs(prev - 111) ? curr : prev)
    })
    return positionMove
  }
  function sendHome(array) {
    const goodPositions = array.map(x => x + ghostIndex)
    positionMove = goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - 170) < Math.abs(prev - 170) ? curr : prev)
    })
    return positionMove
  }


  function pacManBias(array) {
    if (ghostIndex === 168 || ghostIndex === 169 || ghostIndex === 170 || ghostIndex === 171 || ghostIndex === 148 || ghostIndex === 149 || ghostIndex === 150 || ghostIndex === 151 || ghostIndex === 129 || ghostIndex === 130) {
      outOfBox(goodDirections)
    } else if (bias === 1) {
      towardsPacMan(array)
    } else if (bias === 2) {
      awayFromPacMan(array)
    } else if (bias === 3) {
      sendHome()
    }
  }

  // ----------------- Pac getting killed ------------------

  function pacCaught() {
    if(gridSquare[pacIndex] === gridSquare[ghostIndex]) {
      pacDied()
      infoBox.innerHTML = 'PacMan Died.'
      // The game currently resets its self 5 seconds after pacman dies
      setTimeout(reset, 5000)
    }

  }
  let caughtID = setInterval(pacCaught, 50)

  function pacDied() {
    clearInterval(caughtID)
    clearInterval(ghostMoveId)
    pacIndex = null
    clearInterval(countUpid)
  }

  // ------------------------ Pac taking pill ---------------------

  function pilltaken() {
    console.log('take the pill')
    bias = 2
    clearInterval(caughtID)
    // this reverses the ghosts direction once Pman has taken the pills
    lastDirection = -lastDirection
    gridSquare[ghostIndex].classList.remove('ghostOne')
    ghostIndex = ghostIndex - directionMove
    gridSquare[ghostIndex].classList.add('ghostOne')
    // this sets a wareoff time for the ghosts
    setTimeout(pillWareoff, 6000)
  }

  function pacKill() {
    // so pacMan can kill ghost
    if(gridSquare[pacIndex] === gridSquare[ghostIndex]) {
      bias = 3
    }
  }
  const pacKillid = setInterval(pacKill, 50)


  function pillWareoff() {
    bias = 1
    caughtID = setInterval(pacCaught, 50)
    clearInterval(pacKillid)
  }



  function countUp() {
    time = time + 1
    timer.innerHTML = time
  }
  let countUpid = setInterval(countUp, 1000)


  function reset() {
    pacIndex = 21
    directionStore = []
    goodDirections = []
    directionMove = -1
    lastDirection = 0
    gridSquare[ghostIndex].classList.remove('ghostOne')
    ghostIndex = 170
    scoreNumber = 0
    bias = 1
    assignGrid()

    //restart ghosts moving
    ghostMoveId = setInterval(chooseAndMove, 350)
    caughtID = setInterval(pacCaught, 50)
    countUpid = setInterval(countUp, 1000)
  }



})
