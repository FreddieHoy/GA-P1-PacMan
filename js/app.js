
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
const width = 20
const directions = [-1, -width, 1, width]
let pacIndex = 21
// Possible moves for ghost
let scoreNumber = 0
// The timer played
let time = 0
//
//
const ghostOne = {
  ghostIndex: 170,
  // Ghost moving directions. directions --- left, up, right, down
  goodDirections: [],
  // Possible Index Positions for ghost
  goodPositions: [],
  //storing ghost past moves
  directionStore: [],
  // chosen direction to move ghost (inital start)
  directionMove: -1,
  // chosen Index position to move ghost
  positionMove: null,
  // the last direction used by ghost one.
  lastDirection: 0,
  // The score
  // Bias determins the way the ghosts run 1 towards, 2 awayfrom.
  bias: 1
}

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

  function assignGrid(ghost) {
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
        ghost.ghostIndex = i
      } else if (layout[i] === 5) {
        gridSquare[i].classList.add('pill')
      } else if (layout[i] === 6) {
        gridSquare[i].classList.add('warp')
      }
    }
  }
  assignGrid(ghostOne)

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

  function chooseAndMove(ghost) {
    //  EVALUATES ALL THE CHOICES DONT CHOOSE WALL OR BACK ON ITS SELF

    ghost.goodDirections = []
    for(let i = 0; i < directions.length; i++) {
      if (gridSquare[ghost.ghostIndex + directions[i]].classList.contains('wall')) {
        ghost.goodDirections.push(null)
      } else if (gridSquare[ghost.ghostIndex + directions[i]].classList.contains('warp')) {
        ghost.goodDirections.push(null)
      } else if (directions[i] === -ghost.lastDirection) {
        ghost.goodDirections.push(null)
      } else {
        ghost.goodDirections.push(directions[i])
      }
    }
    ghost.goodDirections = ghost.goodDirections.filter(x => x !== null)
    // THIS LOOKS AT ALL THE POSSIBLE DIRECTIONS TO MAKE AND CHOOSES THE BEST ONE
    //towards PacMan

    pacManBias(ghost.goodDirections, ghost)
    makeTheMove(ghost.positionMove, ghost)

  }
  let ghostMoveId = setInterval(function(){
    chooseAndMove(ghostOne)
  }, 150)

  function makeTheMove(positionMove, ghost) {
    //this find the change of index so that it is not repeated
    ghost.directionMove = positionMove - ghost.ghostIndex
    //STORES ALL PREVIOUS MOVES
    ghost.directionStore.push(ghost.directionMove)
    //STORES LAST DIRECTION TO NOT GO BACK ONITSELF
    ghost.lastDirection = ghost.directionStore[ghost.directionStore.length-1]
    // MOVES THE CLASS TO NEXT CHOSEN SQUARE
    gridSquare[ghost.ghostIndex].classList.remove('ghostOne')
    ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove
    gridSquare[ghost.ghostIndex].classList.add('ghostOne')
    // if(gridSquare[ghostIndex].classList.contains('pacman')) {
  }


  // ------------------- pac move direction BIAS ----------------
  function towardsPacMan(array, ghost) {
    ghost.goodPositions = array.map(x => x + ghost.ghostIndex)

    // the ghost takes an array of possible options to move and
    // then chooses the one that is closes to the value of PacMan
    const closestIndex = ghost.goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - pacIndex) < Math.abs(prev - pacIndex) ? curr : prev)
    })
    // Pacs Modulas
    const pacModulas = pacIndex % width
    // This takes the possble indexs to move to and chnages them to modulas% width.
    const posPositionsModulas = ghost.goodPositions.map(x => x % width)
    // This then finds the modulas closest to the modulas of Pacman
    // []
    const closestModulas = posPositionsModulas.reduce(function(prev, curr) {
      return (Math.abs(curr - pacModulas) < Math.abs(prev - pacModulas) ? curr : prev)
    })
    const closestModulasIndex = posPositionsModulas.findIndex(x => x === closestModulas)
    const closestModulasREAL = ghost.goodPositions[closestModulasIndex]
    const idealmoves = [closestIndex, closestModulasREAL]
    ghost.positionMove = idealmoves[Math.floor(Math.random() * idealmoves.length)]
    return ghost.positionMove
  }
  function awayFromPacMan(array, ghost) {
    ghost.goodPositions = array.map(x => x + ghost.ghostIndex)
    ghost.positionMove = ghost.goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - pacIndex) > Math.abs(prev - pacIndex) ? curr : prev)
    })
    return ghost.positionMove
  }
  function outOfBox(array, ghost) {
    ghost.goodPositions = array.map(x => x + ghost.ghostIndex)
    ghost.positionMove = ghost.goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - 111) < Math.abs(prev - 111) ? curr : prev)
    })
    return ghost.positionMove
  }
  function sendHome(array, ghost) {
    ghost.goodPositions = array.map(x => x + ghost.ghostIndex)
    ghost.positionMove = ghost.goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - 170) < Math.abs(prev - 170) ? curr : prev)
    })
    return ghost.positionMove
  }


  function pacManBias(array, ghost) {
    if (ghost.ghostIndex === 168 || ghost.ghostIndex === 169 || ghost.ghostIndex === 170 || ghost.ghostIndex === 171 || ghost.ghostIndex === 148 || ghost.ghostIndex === 149 || ghost.ghostIndex === 150 || ghost.ghostIndex === 151 || ghost.ghostIndex === 129 || ghost.ghostIndex === 130) {
      outOfBox(ghost.goodDirections)
    } else if (ghost.bias === 1) {
      towardsPacMan(array)
    } else if (ghost.bias === 2) {
      awayFromPacMan(array)
    } else if (ghost.bias === 3) {
      sendHome()
    }
  }

  // ----------------- Pac getting killed ------------------

  function pacCaught(ghost) {
    if(gridSquare[pacIndex] === gridSquare[ghost.ghostIndex]) {
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

  function pilltaken(ghost) {


    ghost.bias = 2
    clearInterval(caughtID)
    // this reverses the ghosts direction once Pman has taken the pills
    ghost.lastDirection = -ghost.lastDirection
    gridSquare[ghost.ghostIndex].classList.remove('ghostOne')
    ghost.ghostIndex = ghost.ghostIndex - ghost.directionMove
    gridSquare[ghost.ghostIndex].classList.add('ghostOne')
    // this sets a wareoff time for the ghosts
    setTimeout(pillWareoff, 6000)
  }

  function pacKill(ghost) {
    // so pacMan can kill ghost
    if(gridSquare[pacIndex] === gridSquare[ghost.ghostIndex]) {
      ghost.bias = 3
    }
  }
  const pacKillid = setInterval(pacKill, 50)


  function pillWareoff(ghost) {
    ghost.bias = 1
    caughtID = setInterval(pacCaught, 50)
    clearInterval(pacKillid)
  }



  function countUp() {
    time = time + 1
    timer.innerHTML = time
  }
  let countUpid = setInterval(countUp, 1000)


  function reset(ghost) {
    pacIndex = 21
    ghost.directionStore = []
    ghost.goodDirections = []
    ghost.directionMove = -1
    ghost.lastDirection = 0
    gridSquare[ghost.ghostIndex].classList.remove('ghostOne')
    ghost.ghostIndex = 170
    scoreNumber = 0
    ghost.bias = 1
    assignGrid()

    //restart ghosts moving
    ghostMoveId = setInterval(chooseAndMove, 350)
    caughtID = setInterval(pacCaught, 50)
    countUpid = setInterval(countUp, 1000)
  }



})
