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


    console.log('move this thing')


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
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
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



  // -----------------Ghosts BABY----------------

  let ghostOneIndex = 170
  gridSquare[ghostOneIndex].classList.add('ghostOne')

  // I want to check which direction I can move in
  const directions = [-1, -width, 1, width]
  // directions --- left, up, right, down
  let checkedDirections = []
  let currentDirection


  function checkDirection() {


    checkedDirections = []
    for(let i = 0; i <directions.length; i++) {
      if (gridSquare[ghostOneIndex + directions[i]].classList.contains('wall')) {
        checkedDirections.push(null)
      } else {
        checkedDirections.push(directions[i])
      }
    }

    console.log(checkedDirections)
    checkedDirections = checkedDirections.filter(x => x !== null)
    console.log(checkedDirections)
  }
  setInterval(checkDirection, 1000)



  function moveGhost() {
    gridSquare[ghostOneIndex].classList.remove('ghostOne')

    // if (checkedDirections > 2) {
    const rand = checkedDirections[Math.floor(Math.random()*checkedDirections.length)]
    ghostOneIndex = ghostOneIndex + rand
    // currentDirection = rand
    // } else {
    // ghostOneIndex = ghostOneIndex + currentDirection
    // }
    gridSquare[ghostOneIndex].classList.add('ghostOne')


  }
  setInterval(moveGhost, 1000)




})
