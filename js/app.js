
const width = 20
const directions = [-1, -width, 1, width]
let pacIndex = 250
// Possible moves for ghost
let scoreNumber = 0
// The timer played
let time = 0
let countUpid

const pilltime = 6000
const ghostTimePerMove = 300
let ghostMoveIdOne
let ghostMoveIdTwo
let ghostMoveIdThree
let ghostMoveIdFour
let pacSoundId
let highScoreNumber = 0
let highScoreTime = 0

//
const ghostOne = {
  ghostIndex: 170,
  // Ghost moving directions. directions --- left, up, right, down
  ghostClass: 'ghostOne',

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
const ghostTwo = {
  ghostIndex: 169,
  // Ghost moving directions. directions --- left, up, right, down
  ghostClass: 'ghostTwo',

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
const ghostThree = {
  ghostIndex: 168,
  // Ghost moving directions. directions --- left, up, right, down
  ghostClass: 'ghostThree',

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
const ghostFour = {
  ghostIndex: 171,
  // Ghost moving directions. directions --- left, up, right, down
  ghostClass: 'ghostFour',

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
const ghosts = [ghostOne, ghostTwo, ghostThree, ghostFour]

// creating the grid ------------------------------------
// ASSIGN A CLASS A NUMBER.
// empty = 0
// wall = 1
// pacman = 3
// ghosts = 4
// pill = 5
// WARP = 6

const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1,
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 2, 1, 1, 2, 1, 1, 0, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1,
  1, 6, 6, 2, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 2, 6, 6, 1,
  1, 1, 1, 2, 1, 2, 2, 1, 8, 7, 4, 9, 1, 2, 2, 1, 2, 1, 1, 1,
  1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  1, 2, 1, 2, 5, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 5, 2, 1, 2, 1,
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
  const start = document.querySelector('.start')
  const highScore = document.querySelector('.highScore')
  const left = document.querySelector('.left')
  const up = document.querySelector('.up')
  const right = document.querySelector('.right')
  const down = document.querySelector('.down')

  document.addEventListener('keydown', preventDefultScroll)
  start.addEventListener('click', () => {
    if (start.innerHTML === 'Start') {
      startGame()
      document.addEventListener('keyup', movePacMan)
      start.innerHTML = 'RUN!'
      infoBox.innerHTML = 'nice m8'
      start.style.backgroundColor = 'red'
    } else if (start.innerHTML === 'Play Again?') {
      countUpid = setInterval(function(){
        countUp()
      }, 1000)
      for( let i=0; i<16; i++) {
        clearInterval(caughtIdOne)
        clearInterval(caughtIdTwo)
        clearInterval(caughtIdThree)
        clearInterval(caughtIdFour)
      }
      for(let i=0; i<ghosts.length; i++) {
        for( let i=0; i<16; i++) {
          clearInterval(caughtIdOne)
          clearInterval(caughtIdTwo)
          clearInterval(caughtIdThree)
          clearInterval(caughtIdFour)
        }
        startReset(ghosts[i])
        caughtIdOne = setInterval(function(){
          pacCaught(ghostOne)
        }, 60)
        caughtIdTwo = setInterval(function(){
          pacCaught(ghostTwo)
        }, 60)
        caughtIdThree = setInterval(function(){
          pacCaught(ghostThree)
        }, 60)
        caughtIdFour = setInterval(function(){
          pacCaught(ghostFour)
        }, 60)
        start.innerHTML = 'RUN!'
        start.style.backgroundColor = 'red'
      }
    }
  })


  function assignGrid(ghostOne, ghostTwo, ghostThree, ghostFour) {
    infoBox.innerHTML = 'Click ↑'
    for (let i = 0; i < layout.length; i++) {
      if (layout[i] === 1) {
        gridSquare[i].classList.add('wall')
      } else if (layout[i] === 2) {
        gridSquare[i].classList.add('food')
      } else if (layout[i] === 3) {
        gridSquare[i].classList.add('pacmanRight')
      } else if (layout[i] === 5) {
        gridSquare[i].classList.add('pill')
      } else if (layout[i] === 6) {
        gridSquare[i].classList.add('warp')
      } else if (layout[i] === 4) {
        gridSquare[i].classList.add('ghostOne')
        ghostOne.ghostIndex = i
      } else if (layout[i] === 7) {
        gridSquare[i].classList.add('ghostTwo')
        ghostTwo.ghostIndex = i
      } else if (layout[i] === 8) {
        gridSquare[i].classList.add('ghostThree')
        ghostThree.ghostIndex = i
      } else if (layout[i] === 9) {
        gridSquare[i].classList.add('ghostFour')
        ghostFour.ghostIndex = i
      }
    }
  }
  assignGrid(ghostOne, ghostTwo, ghostThree, ghostFour)

  function checkWin() {
    // let foodAmount = (layout.filter(x => x === 2)).length
    let foodAmount = 0
    for (let i=0; i<400; i++){
      if (gridSquare[i].classList.contains('food')) {
        foodAmount = foodAmount + 1
      }
    }
    if (foodAmount === 0) {
      clearInterval(pacSoundId)

      for( let i=0; i<16; i++) {
        clearInterval(caughtIdOne)
        clearInterval(caughtIdTwo)
        clearInterval(caughtIdThree)
        clearInterval(caughtIdFour)
      }

      clearInterval(ghostMoveIdOne)
      clearInterval(ghostMoveIdTwo)
      clearInterval(ghostMoveIdThree)
      clearInterval(ghostMoveIdFour)
      clearInterval(countUpid)

      start.innerHTML = 'Play Again?'
      infoBox.innerHTML = 'YOU WIN!'
      if (scoreNumber > highScoreNumber) {
        highScoreNumber = scoreNumber
        highScoreTime = time
      }

      highScore.innerHTML = `${highScoreNumber}ps in ${highScoreTime}s`
      time = time + 0
    }
  }
  setInterval(checkWin, 200)

  //------------------ MOVING PacMan -----------------------------
  // function deathSound() {
  const death = new Audio('pacman_death.wav')

  function pacSound(){
    const move = new Audio('pacman_chomp.wav')
    move.play()
  }

  function movePacMan(e) {
    gridSquare[pacIndex].classList.remove('pacmanUp')
    gridSquare[pacIndex].classList.remove('pacmanRight')
    gridSquare[pacIndex].classList.remove('pacmanDown')
    gridSquare[pacIndex].classList.remove('pacmanLeft')
    switch(e.keyCode) {
      case 37: // left arrow
        left.classList.add('active')
        setTimeout(() => left.classList.remove('active'), 100)
        if (gridSquare[pacIndex-1].classList.contains('wall')) pacIndex += 0
        else if(pacIndex % width !== 0) pacIndex -= 1
        gridSquare[pacIndex].classList.add('pacmanLeft')

        break
      case 38: // upp arrow
        up.classList.add('active')
        setTimeout(() => up.classList.remove('active'), 100)
        if (gridSquare[pacIndex-width].classList.contains('wall')) pacIndex += 0
        else if(pacIndex - width >= 0) pacIndex -= width
        gridSquare[pacIndex].classList.add('pacmanUp')
        break
      case 39: // right arrow
        right.classList.add('active')
        setTimeout(() => right.classList.remove('active'), 100)
        if (gridSquare[pacIndex + 1].classList.contains('wall')) pacIndex += 0
        else if(pacIndex % width < width - 1) pacIndex += 1
        gridSquare[pacIndex].classList.add('pacmanRight')
        break
      case 40: //down arrow
        down.classList.add('active')
        setTimeout(() => down.classList.remove('active'), 100)
        if (gridSquare[pacIndex+width].classList.contains('wall')) pacIndex += 0
        else if(pacIndex + width < width * width) pacIndex += width
        gridSquare[pacIndex].classList.add('pacmanDown')
        break
    }
    // colliding with food -----------------------
    if(gridSquare[pacIndex].classList.contains('food')) {
      gridSquare[pacIndex].classList.remove('food')
      scoreNumber = scoreNumber + 10
      score.innerHTML = scoreNumber
    }

    // gridSquare[pacIndex].classList.add('pacman')

    // colliding with pill ------------------------------------------
    if(gridSquare[pacIndex].classList.contains('pill')) {
      gridSquare[pacIndex].classList.remove('pill')
      for (let i = 0; i < ghosts.length; i++) {
        pilltaken(ghosts[i])
      }
      setTimeout(function(){
        for( let i=0; i<16; i++) {
          clearInterval(caughtIdOne)
          clearInterval(caughtIdTwo)
          clearInterval(caughtIdThree)
          clearInterval(caughtIdFour)
        }
        caughtIdOne = setInterval(function(){
          pacCaught(ghostOne)
        }, 60)
        caughtIdTwo = setInterval(function(){
          pacCaught(ghostTwo)
        }, 60)
        caughtIdThree = setInterval(function(){
          pacCaught(ghostThree)
        }, 60)
        caughtIdFour = setInterval(function(){
          pacCaught(ghostFour)
        }, 60)
      }, pilltime)
    }
    if (pacIndex === 141) {
      gridSquare[pacIndex].classList.remove('pacmanUp')
      gridSquare[pacIndex].classList.remove('pacmanRight')
      gridSquare[pacIndex].classList.remove('pacmanDown')
      gridSquare[pacIndex].classList.remove('pacmanLeft')
      pacIndex = 157
      gridSquare[pacIndex].classList.add('pacmanLeft')
    }
    if (pacIndex === 158) {
      gridSquare[pacIndex].classList.remove('pacmanUp')
      gridSquare[pacIndex].classList.remove('pacmanRight')
      gridSquare[pacIndex].classList.remove('pacmanDown')
      gridSquare[pacIndex].classList.remove('pacmanLeft')
      pacIndex = 142
      gridSquare[pacIndex].classList.add('pacmanRight')
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
      } else if (gridSquare[ghost.ghostIndex + directions[i]].classList.contains('ghostOne') && ghost.goodDirections.length > 2) {
        ghost.goodDirections.push(null)
      } else if (gridSquare[ghost.ghostIndex + directions[i]].classList.contains('ghostTwo') && ghost.goodDirections.length > 2) {
        ghost.goodDirections.push(null)
      } else if (gridSquare[ghost.ghostIndex + directions[i]].classList.contains('ghostThree') && ghost.goodDirections.length > 2) {
        ghost.goodDirections.push(null)
      } else if (gridSquare[ghost.ghostIndex + directions[i]].classList.contains('ghostFour') && ghost.goodDirections.length > 2) {
        ghost.goodDirections.push(null)
      } else if (gridSquare[ghost.ghostIndex + directions[i]].classList.contains('ghostFlee') && ghost.goodDirections.length > 2) {
        ghost.goodDirections.push(null)
      } else if (gridSquare[ghost.ghostIndex + directions[i]].classList.contains('ghostDead') && ghost.goodDirections.length > 2) {
        ghost.goodDirections.push(null)
      } else if (directions[i] === -ghost.lastDirection) {
        ghost.goodDirections.push(null)
      } else {
        ghost.goodDirections.push(directions[i])
      }
    }
    ghost.goodDirections = ghost.goodDirections.filter(x => x !== null)
    // THIS LOOKS AT ALL THE POSSIBLE DIRECTIONS TO MAKE AND CHOOSES THE BEST ONE
    pacManBias(ghost)
    makeTheMove(ghost)
  }

  function startGame() {
    pacSoundId = setInterval(pacSound, 650)
    countUpid = setInterval(countUp, 1000)
    ghostMoveIdOne = setInterval(function(){
      chooseAndMove(ghostOne)
    }, ghostTimePerMove)
    ghostMoveIdTwo = setInterval(function(){
      chooseAndMove(ghostTwo)
    }, ghostTimePerMove)
    ghostMoveIdThree = setInterval(function(){
      chooseAndMove(ghostThree)
    }, ghostTimePerMove)
    ghostMoveIdFour = setInterval(function(){
      chooseAndMove(ghostFour)
    }, ghostTimePerMove)
  }

  function makeTheMove(ghost) {
    //this find the change of index so that it is not repeated
    ghost.directionMove = ghost.positionMove - ghost.ghostIndex
    //STORES ALL PREVIOUS MOVES
    ghost.directionStore.push(ghost.directionMove)
    //STORES LAST DIRECTION TO NOT GO BACK ONITSELF
    ghost.lastDirection = ghost.directionStore[ghost.directionStore.length-1]
    // MOVES THE CLASS TO NEXT CHOSEN SQUARE
    if (ghost.bias === 2) {
      gridSquare[ghost.ghostIndex].classList.remove('ghostFlee')
      ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove
      gridSquare[ghost.ghostIndex].classList.add('ghostFlee')
    } else if (ghost.bias === 3) {
      gridSquare[ghost.ghostIndex].classList.remove('ghostDead')
      ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove
      gridSquare[ghost.ghostIndex].classList.add('ghostDead')

    } else {
      gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass)
      ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove
      gridSquare[ghost.ghostIndex].classList.add(ghost.ghostClass)

    }
  }


  // ------------------- pac move direction BIAS ----------------
  function towardsPacMan(ghost) {
    ghost.goodPositions = ghost.goodDirections.map(x => x + ghost.ghostIndex)
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
  function awayFromPacMan(ghost) {
    ghost.goodPositions = ghost.goodDirections.map(x => x + ghost.ghostIndex)
    ghost.positionMove = ghost.goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - pacIndex) > Math.abs(prev - pacIndex) ? curr : prev)
    })
    return ghost.positionMove
  }
  function outOfBox(ghost) {
    ghost.goodPositions = ghost.goodDirections.map(x => x + ghost.ghostIndex)
    ghost.positionMove = ghost.goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - 111) < Math.abs(prev - 111) ? curr : prev)
    })
    return ghost.positionMove
  }
  function sendHome(ghost) {
    ghost.goodPositions = ghost.goodDirections.map(x => x + ghost.ghostIndex)
    ghost.positionMove = ghost.goodPositions.reduce(function(prev, curr) {
      return (Math.abs(curr - 170) < Math.abs(prev - 170) ? curr : prev)
    })
    return ghost.positionMove
  }
  function pacManBias(ghost) {
    if (ghost.ghostIndex === 168 || ghost.ghostIndex === 169 || ghost.ghostIndex === 170 || ghost.ghostIndex === 171 || ghost.ghostIndex === 148 || ghost.ghostIndex === 149 || ghost.ghostIndex === 150 || ghost.ghostIndex === 151) {
      outOfBox(ghost)
    } else if (ghost.bias === 1) {
      towardsPacMan(ghost)
    } else if (ghost.bias === 2) {
      awayFromPacMan(ghost)
    } else if (ghost.bias === 3) {
      sendHome(ghost)
    }
  }

  // ----------------- Pac getting killed ------------------
  function pacCaught(ghost) {
    console.log('is it catching?')
    if(gridSquare[pacIndex] === gridSquare[ghost.ghostIndex]) {
      gridSquare[pacIndex].classList.remove('pacmanRight')
      gridSquare[pacIndex].classList.remove('pacmanLeft')
      gridSquare[pacIndex].classList.remove('pacmanUp')
      gridSquare[pacIndex].classList.remove('pacmanDown')
      pacDied(ghost)
      death.play()
      clearInterval(pacSoundId)
      clearInterval(countUpid)
      for( let i=0; i<16; i++) {
        clearInterval(caughtIdOne)
        clearInterval(caughtIdTwo)
        clearInterval(caughtIdThree)
        clearInterval(caughtIdFour)
      }
      if (scoreNumber > highScoreNumber) {
        highScoreNumber = scoreNumber
        highScoreTime = time
      }
      highScore.innerHTML = `${highScoreNumber}ps in ${highScoreTime}s`
      time = time + 0
      start.innerHTML = 'Play Again?'
      infoBox.innerHTML = 'PacMan Died.'
      start.style.backgroundColor = 'red'
    }
  }

  let caughtIdOne = setInterval(function(){
    pacCaught(ghostOne)
  }, 60)
  let caughtIdTwo = setInterval(function(){
    pacCaught(ghostTwo)
  }, 60)
  let caughtIdThree = setInterval(function(){
    pacCaught(ghostThree)
  }, 60)
  let caughtIdFour = setInterval(function(){
    pacCaught(ghostFour)
  }, 60)

  function pacDied() {
    for( let i=0; i<16; i++) {
      clearInterval(caughtIdOne)
      clearInterval(caughtIdTwo)
      clearInterval(caughtIdThree)
      clearInterval(caughtIdFour)
    }

    clearInterval(ghostMoveIdOne)
    clearInterval(ghostMoveIdTwo)
    clearInterval(ghostMoveIdThree)
    clearInterval(ghostMoveIdFour)
    pacIndex = null
    clearInterval(countUpid)
  }

  function startReset(ghost) {
    for( let i=0; i<16; i++) {
      clearInterval(caughtIdOne)
      clearInterval(caughtIdTwo)
      clearInterval(caughtIdThree)
      clearInterval(caughtIdFour)
    }
    reset(ghost)
    clearInterval(pacSoundId)
    pacSoundId = setInterval(pacSound, 650)
    //restart ghosts moving
    clearInterval(ghostMoveIdOne)
    clearInterval(ghostMoveIdTwo)
    clearInterval(ghostMoveIdThree)
    clearInterval(ghostMoveIdFour)
    ghostMoveIdOne = setInterval(function(){
      chooseAndMove(ghostOne)
    }, ghostTimePerMove)
    ghostMoveIdTwo = setInterval(function(){
      chooseAndMove(ghostTwo)
    }, ghostTimePerMove)
    ghostMoveIdThree = setInterval(function(){
      chooseAndMove(ghostThree)
    }, ghostTimePerMove)
    ghostMoveIdFour = setInterval(function(){
      chooseAndMove(ghostFour)
    }, ghostTimePerMove)

  }

  // ------------------------ Pac taking pill ---------------------

  function pilltaken(ghost) {
    ghost.bias = 2
    gridSquare[ghost.ghostIndex].classList.remove('ghostDead')
    gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass)
    gridSquare[ghost.ghostIndex].classList.add('ghostFlee')
    for( let i=0; i<16; i++) {
      clearInterval(caughtIdOne)
      clearInterval(caughtIdTwo)
      clearInterval(caughtIdThree)
      clearInterval(caughtIdFour)
    }
    // this reverses the ghosts direction once Pman has taken the pills
    ghost.lastDirection = -ghost.lastDirection
    gridSquare[ghost.ghostIndex].classList.remove('ghostFlee')
    ghost.ghostIndex = ghost.ghostIndex - ghost.directionMove
    gridSquare[ghost.ghostIndex].classList.add('ghostFlee')


    const pacKillIdOne = setInterval(function(){
      pacKill(ghostOne)
    }, 60)
    const pacKillIdTwo = setInterval(function(){
      pacKill(ghostTwo)
    }, 60)
    const pacKillIdThree = setInterval(function(){
      pacKill(ghostThree)
    }, 60)
    const pacKillIdFour = setInterval(function(){
      pacKill(ghostFour)
    }, 60)

    // this sets a wareoff time for the ghosts
    setTimeout(function(){
      for( let i=0; i<4; i++) {
        clearInterval(pacKillIdOne)
        clearInterval(pacKillIdTwo)
        clearInterval(pacKillIdThree)
        clearInterval(pacKillIdFour)
      }
      pillWareoff(ghost)
    }, pilltime)
  }

  function pacKill(ghost){
    console.log('can pac kill')
    for( let i=0; i<16; i++) {
      clearInterval(caughtIdOne)
      clearInterval(caughtIdTwo)
      clearInterval(caughtIdThree)
      clearInterval(caughtIdFour)
    }
    // so pacMan can kill ghost
    if(gridSquare[pacIndex] === gridSquare[ghost.ghostIndex]) {
      scoreNumber = scoreNumber + 200
      infoBox.innerHTML = 'Ghost \n +200 Points'
      gridSquare[ghost.ghostIndex].classList.remove('ghostFlee')
      gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass)
      gridSquare[ghost.ghostIndex].classList.remove('ghostDead')

      ghost.lastDirection = -ghost.lastDirection
      gridSquare[ghost.ghostIndex].classList.remove('ghostDead')
      ghost.ghostIndex = ghost.ghostIndex - ghost.directionMove
      gridSquare[ghost.ghostIndex].classList.add('ghostDead')

      ghost.bias = 3
    }
  }

  function pillWareoff(ghost) {
    ghost.bias = 1
    gridSquare[ghost.ghostIndex].classList.remove('ghostDead')
    gridSquare[ghost.ghostIndex].classList.remove('ghostFlee')

    for( let i=0; i<16; i++) {
      clearInterval(caughtIdOne)
      clearInterval(caughtIdTwo)
      clearInterval(caughtIdThree)
      clearInterval(caughtIdFour)
    }

  }

  function countUp() {
    time = time + 1
    timer.innerHTML = time
  }

  function reset(ghost) {
    for( let i=0; i<16; i++) {
      clearInterval(caughtIdOne)
      clearInterval(caughtIdTwo)
      clearInterval(caughtIdThree)
      clearInterval(caughtIdFour)
    }
    scoreNumber = 0
    time = 0
    score.innerHTML = scoreNumber
    timer.innerHTML = time
    gridSquare[ghost.ghostIndex].classList.remove('ghostDead')
    gridSquare[ghost.ghostIndex].classList.remove('ghostFlee')
    gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass)
    pacIndex = 250
    ghost.directionStore = []
    ghost.goodDirections = []
    ghost.directionMove = -1
    ghost.lastDirection = 0
    gridSquare[ghostOne.ghostIndex].classList.remove('ghostOne')
    gridSquare[ghostTwo.ghostIndex].classList.remove('ghostTwo')
    gridSquare[ghostThree.ghostIndex].classList.remove('ghostThree')
    gridSquare[ghostFour.ghostIndex].classList.remove('ghostFour')
    ghostOne.ghostIndex = 170
    ghostTwo.ghostIndex = 169
    ghostOne.ghostIndex = 168
    ghostTwo.ghostIndex = 171
    ghost.bias = 1
    assignGrid(ghostOne, ghostTwo, ghostThree, ghostFour)
  }

})
