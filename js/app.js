
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
let pacIndex = 250
// Possible moves for ghost
let scoreNumber = 0
// The timer played
let time = 0
//
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
const ghost = [ghostOne, ghostTwo, ghostThree, ghostFour]

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
  1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1,
  1, 6, 6, 2, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 2, 6, 6, 1,
  1, 1, 1, 2, 1, 0, 0, 1, 8, 7, 4, 9, 1, 0, 0, 1, 2, 1, 1, 1,
  1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1,
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

  document.addEventListener('keydown', movePacMan)
  document.addEventListener('keydown', preventDefultScroll)

  function assignGrid(ghostOne, ghostTwo, ghostThree, ghostFour) {
    infoBox.innerHTML = 'Here we go!'
    for (let i = 0; i < layout.length; i++) {
      if (layout[i] === 1) {
        gridSquare[i].classList.add('wall')
      } else if (layout[i] === 2) {
        gridSquare[i].classList.add('food')
      } else if (layout[i] === 3) {
        gridSquare[i].classList.add('pacman')
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

      for (let i = 0; i<ghost.length; i++) {
        pilltaken(ghost[i])
      }

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
    //towards PacMan

    pacManBias(ghost)
    makeTheMove(ghost)

  }

  let ghostMoveIdOne = setInterval(function(){
    chooseAndMove(ghostOne)
  }, 200)
  let ghostMoveIdTwo = setInterval(function(){
    chooseAndMove(ghostTwo)
  }, 200)
  let ghostMoveIdThree = setInterval(function(){
    chooseAndMove(ghostThree)
  }, 200)
  let ghostMoveIdFour = setInterval(function(){
    chooseAndMove(ghostFour)
  }, 200)

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
      // setTimeout(function(){
      //   doubleRun(ghostOne)
      // }, 500)
      // setTimeout(function(){
      //   doubleRun(ghostTwo)
      // }, 500)
      // setTimeout(function(){
      //   doubleRun(ghostThree)
      // }, 500)
      // setTimeout(function(){
      //   doubleRun(ghostFour)
      // }, 500)
    } else {
      gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass)
      ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove
      gridSquare[ghost.ghostIndex].classList.add(ghost.ghostClass)
    // if(gridSquare[ghostIndex].classList.contains('pacman')) {
    }
  }

  // function doubleRun(ghost) {
  //   gridSquare[ghost.ghostIndex].classList.remove('ghostDead')
  //   ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove
  //   gridSquare[ghost.ghostIndex].classList.add('ghostDead')
  // }

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
    if(gridSquare[pacIndex] === gridSquare[ghost.ghostIndex]) {
      gridSquare[pacIndex].classList.remove('pacman')
      pacDied()
      clearInterval(countUpid)
      time = time + 0
      infoBox.innerHTML = 'PacMan Died.'
      // The game currently resets its self 5 seconds after pacman dies
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

  const caughtIds = [caughtIdOne, caughtIdTwo, caughtIdThree, caughtIdFour]
  const ghostMoveIds = [ghostMoveIdOne, ghostMoveIdTwo, ghostMoveIdThree, ghostMoveIdFour]


  function pacDied() {

    for (let i = 0; i<ghost.length; i++) {
      clearInterval(caughtIds[i])
      clearInterval(ghostMoveIds[i])
    }
    pacIndex = null
    clearInterval(countUpid)
    setTimeout(function(){

      for (let i = 0; i<ghost.length; i++) {
        reset(ghost[i])
      }
      //restart ghosts moving
      ghostMoveIdOne = setInterval(function(){
        chooseAndMove(ghostOne)
      }, 300)
      ghostMoveIdTwo = setInterval(function(){
        chooseAndMove(ghostTwo)
      }, 300)
      ghostMoveIdThree = setInterval(function(){
        chooseAndMove(ghostThree)
      }, 300)
      ghostMoveIdFour = setInterval(function(){
        chooseAndMove(ghostFour)
      }, 300)

      caughtIdOne = setInterval(function(){
        pacCaught(ghostOne)
      }, 50)
      caughtIdTwo = setInterval(function(){
        pacCaught(ghostTwo)
      }, 50)
      caughtIdOne = setInterval(function(){
        pacCaught(ghostThree)
      }, 50)
      caughtIdTwo = setInterval(function(){
        pacCaught(ghostFour)
      }, 50)

      countUpid = setInterval(function(){
        countUp(ghostOne)
      }, 1000)
      countUpid = setInterval(function(){
        countUp(ghostTwo)
      }, 1000)
      countUpid = setInterval(function(){
        countUp(ghostThree)
      }, 1000)
      countUpid = setInterval(function(){
        countUp(ghostFour)
      }, 1000)
    }, 5000)

  }

  // ------------------------ Pac taking pill ---------------------
  const pacKillsId = [pacKillIdOne, pacKillIdTwo, pacKillIdThree, pacKillIdFour]
  for (let i = 0; i<ghost.length; i++) {
    pacKillsId[i] = null
  }

  const pacKillIdOne = null
  const pacKillIdTwo = null
  const pacKillIdThree = null
  const pacKillIdFour = null

  function pilltaken(ghost) {
    ghost.bias = 2
    gridSquare[ghost.ghostIndex].classList.remove('ghostDead')
    gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass)
    gridSquare[ghost.ghostIndex].classList.add('ghostFlee')

    for (let i = 0; i<ghost.length; i++) {
      clearInterval(caughtIds[i])
    }
    // this reverses the ghosts direction once Pman has taken the pills
    ghost.lastDirection = -ghost.lastDirection
    gridSquare[ghost.ghostIndex].classList.remove('ghostFlee')
    ghost.ghostIndex = ghost.ghostIndex - ghost.directionMove
    gridSquare[ghost.ghostIndex].classList.add('ghostFlee')

    for (let i = 0; i<ghost.length; i++) {
      pacKillsId[i] = setInterval(function(){
        pacKill(ghost[i])
      }, 50)
    }
    // this sets a wareoff time for the ghosts
    for (let i = 0; i<ghost.length; i++) {
      setTimeout(function(){
        pillWareoff(ghost[i])
      }, 5000)
    }
  }

  function pacKill(ghost){
    // so pacMan can kill ghost
    if(gridSquare[pacIndex] === gridSquare[ghost.ghostIndex]) {
      scoreNumber = scoreNumber + 200
      infoBox.innerHTML = 'You ate a ghost! \n\n\n 200 Points!'
      gridSquare[ghost.ghostIndex].classList.remove('ghostFlee')
      gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass)
      gridSquare[ghost.ghostIndex].classList.remove('ghostDead')

      console.log('can pac kill')
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

    clearInterval(pacKillIdOne)
    clearInterval(pacKillIdTwo)
    clearInterval(pacKillIdThree)
    clearInterval(pacKillIdFour)

    caughtIdOne = setInterval(function(){
      pacCaught(ghostOne)
    }, 50)
    caughtIdTwo = setInterval(function(){
      pacCaught(ghostTwo)
    }, 50)
    caughtIdThree = setInterval(function(){
      pacCaught(ghostThree)
    }, 50)
    caughtIdFour = setInterval(function(){
      pacCaught(ghostFour)
    }, 50)
    // clearInterval(pacKillIdTwo)
  }


  function countUp() {
    time = time + 1
    timer.innerHTML = time
  }
  let countUpid = setInterval(countUp, 1000)


  function reset(ghost) {
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
