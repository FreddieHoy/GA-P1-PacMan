document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  // const gamelayout = document. querySelector('.game')

  function createGrid(x) {
    for (let i = 0; i < x; i++) {
      const div = document.createElement('div')
      div.classList.add('gridSquare')
      grid.appendChild(div)
    }
    // gamelayout.style.width =
  }
  createGrid(400)

  console.log('JS loaded')

  const gridSquare = document.querySelectorAll('.gridSquare')

  console.log(gridSquare)
  let currentIndex = 0
  const width = 20

  gridSquare[0].classList.add('dog')
  gridSquare[64].classList.add('bone')


  //MOVING THE DOG -----------------------------
  function moveMyDog(e) {
    gridSquare[currentIndex].classList.remove('dog')

    console.log('move this thing')
    switch(e.keyCode) {
      case 37:
        if(currentIndex % width !== 0) currentIndex -= 1
        break
      case 38:
        if(currentIndex - width >= 0) currentIndex -= width
        break
      case 39:
        if(currentIndex % width < width - 1) currentIndex += 1
        break
      case 40:
        if(currentIndex + width < width * width) currentIndex += width
        break
    }

    // ---------- colliding with BONE ------
    if(gridSquare[currentIndex].classList.contains('bone')) {
      gridSquare[currentIndex].classList.remove('bone')
    }

    gridSquare[currentIndex].classList.add('dog')
  }

  document.addEventListener('keyup', moveMyDog)

  // Preventing arrow keys from scrolling ---------------------------
  document.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
  }, false)
  // --------------------------------------------------


  // creating walls within the grid --------------------------

  // create array with 1 and 0

  // const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  // [0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  // [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //
  //


  // ]
  //1s will signify which gridsquare to add wall
  // add walls using class
  // (can the go on to do this with other properties such as food etc.)










})
