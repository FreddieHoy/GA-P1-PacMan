# Project 1: PacMan

The game: [PacMan](https://freddiehoy.github.io/GA-P1-PacMan/)

## Overview

I have remade a browser based version of the old arcade game PacMan. Have a play try and eat all the food without being caught by the spooky ghosts. Set a high score and then challenge your friends to beat it!

This is my first ever coding project! Taking one week to build mainly using JavaScript! I am one month in to the Software Engineering Immersive course at General Assembly London.

![PacMan Screen Shot](https://user-images.githubusercontent.com/51379192/61525224-dcf84400-aa0f-11e9-87b7-6162992fc5f3.png)


## Brief
* Create a grid based game in the web browser.
* The player should be able to clear at least one board.
* The player's score should be displayed at the end of the game.
* Create 4 ghosts.
* Create effective game logic for the ghosts.
* Add in a warp hole that moves pac man to the other side of the board.
* Add on pills that PacMan can eat making the ghosts run away.
* Enable PacMan to kill ghosts once he has taken the pill awarding extra points.
* Add sounds.
* Include separate HTML / CSS / JavaScript files.
* Use Javascript or jQuery for DOM manipulation.
* Deploy your game online, using Github Pages, where the rest of the world can access it.

## Technologies Used
* HTML5 with HTML5 audio
* CSS3 with animation
* JavaScript (ES6)

## Features & Pages

- One page
- High Score - Score & time
- Restart Game
- Timer
- Score

## Approach taken
This section lays out the general approach and key problems solved.

#### Grid layout
The First step was to make a grid which would make the base of the game.
This was done by deciding a width and using for loop to create 400 divs creating a 20x20 game board.

```JS
function createGrid(x) {
  for (let i = 0; i < x; i++) {
    const div = document.createElement('div')
    div.classList.add('gridSquare')
    grid.appendChild(div) //Adding the grid squares to within a larger div
  }
}
createGrid(400)
```

A layout was then made in order to assign different classes to each grid square including wall positions and the starts places of the ghosts and PacMan.

```JS
const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1,
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 2, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1,
  1, 6, 6, 2, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 2, 1, 2, 6, 6, 1,
  1, 1, 1, 2, 1, 2, 1, 1, 8, 7, 4, 9, 1, 1, 2, 1, 2, 1, 1, 1,
  1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1,
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
```
The classes were then assigned using a loop.

```JS
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
```

#### Moving PacMan

In order to move PacMan I simply added event listeners to the arrow keys. There defaults were also removed so that the up and down arrow keys did not scroll the page. These vent listeners then ran a function that physically move pac man.

Each div was represented with an index number 0 to 400. PacMan was moved by removing the class of PacMan changing his position index number and then adding his class to the new position index number.

To move PacMan left and right his position index was either +/- 1. to move PacMan up or down his index had to be +/- the width (20) of the grid.

Below is a simplified code of moving PacMan. Also contained in this code, is the prevention of using moving if the next index contains a wall.

```JS
function movePacMan(e) {
  gridSquare[pacIndex].classList.remove('pacman')
  switch(e.keyCode) {
    case 37: // left arrow
      if (gridSquare[pacIndex-1].classList.contains('wall')) pacIndex += 0
      else if(pacIndex % width !== 0) pacIndex -= 1
      gridSquare[pacIndex].classList.add('pacman')
      break
    case 38: // up arrow
      if (gridSquare[pacIndex-width].classList.contains('wall')) pacIndex += 0
      else if(pacIndex - width >= 0) pacIndex -= width
      gridSquare[pacIndex].classList.add('pacman')
      break
    case 39: // right arrow
      if (gridSquare[pacIndex + 1].classList.contains('wall')) pacIndex += 0
      else if(pacIndex % width < width - 1) pacIndex += 1
      gridSquare[pacIndex].classList.add('pacman')
      break
    case 40: //down arrow
      if (gridSquare[pacIndex+width].classList.contains('wall')) pacIndex += 0
      else if(pacIndex + width < width * width) pacIndex += width
      gridSquare[pacIndex].classList.add('pacman')
      break
  }
}
```

#### Ghosts Logic
Moving the Ghosts works in a similar way by removing and re-adding the class of the ghost, however instead of event listeners a set interval is used to move the ghost once every number of milliseconds.

#### Chasing PacMan
The difficulty with the ghosts is that out of all the possible choices of the next move it can take it must chose one that take it on a route that chases PacMan.

It therefore firsts evaluates all the possible moves, creating an array that does not include any directions that are into walls and importantly no directions that move the ghosts backwards.

#### Key ghost logic! - Biggest Challenge
One this array is created, in oder to chase PacMan some effective code was written that it choose it next move based on two ideas.

The first was to chose the next position that would bring its index closest to PacMan. The problem with this is that mostly the ghosts choses up or down because +/- 20 (width) is often a much closer index then +/- 1.

The second was to choose the next position that would bring the Ghosts modulus by width (%width) closer to PacMans %width. The issue of this second one is that the ghosts will always chose left of right because up and down does not change the ghosts modulus making it no closer to PacMans.

By randomly choosing one of each of these, effectively combining them, the ghost follows a path that always leads to PacMan at relatively direct route.

See the code below.

```JS
function towardsPacMan(ghost) {
  // return all the possible new position indexs the ghost can move.
  ghost.goodPositions = ghost.goodDirections.map(x => x + ghost.ghostIndex)
  // all the possible positions are reduced down to the one that bring then
  // ghosts position index closest to pacmans
  const closestIndex = ghost.goodPositions.reduce(function(prev, curr) {
    return (Math.abs(curr - pacIndex) < Math.abs(prev - pacIndex) ? curr : prev)
  })
  // Pacmans Modulas % width.
  const pacModulas = pacIndex % width
  // This takes the possble indexs to move to and changes them to modulas% width.
  const posPositionsModulas = ghost.goodPositions.map(x => x % width)
  // This then finds the modulas closest to the modulas of Pacman
  const closestModulas = posPositionsModulas.reduce(function(prev, curr) {
    return (Math.abs(curr - pacModulas) < Math.abs(prev - pacModulas) ? curr : prev)
  })
  const closestModulasIndex = posPositionsModulas.findIndex(x => x === closestModulas)
  const closestModulasREAL = ghost.goodPositions[closestModulasIndex]
  // and array is made with the index and mod closest
  // one is randomly chosen at each junction where there is a choice.
  const idealmoves = [closestIndex, closestModulasREAL]
  ghost.positionMove = idealmoves[Math.floor(Math.random() * idealmoves.length)]
  return ghost.positionMove
}
```

#### Bias
Notably the ghosts are not always chasing PacMan. When a pill is take by PacMan the ghosts must run away. When a ghost is then killed it runs to the centre where they start.

to control this a bias variable was created which changes depends on where the ghosts need to move. This then changes the function used deciding which path the ghosts takes.

```JS
function pacManBias(ghost) {
  // this function get the ghosts out of the box they start in
  if (ghost.ghostIndex === 168 || ghost.ghostIndex === 169 || ghost.ghostIndex === 170 || ghost.ghostIndex === 171 || ghost.ghostIndex === 148 || ghost.ghostIndex === 149 || ghost.ghostIndex === 150 || ghost.ghostIndex === 151) {
    outOfBox(ghost) // This gets the ghosts out of their start box.
  } else if (ghost.bias === 1) {
    towardsPacMan(ghost)
  } else if (ghost.bias === 2) {
    awayFromPacMan(ghost)
  } else if (ghost.bias === 3) {
    sendHome(ghost)
  }
}
```
### Audio
Audio was added to enhance player experience. Note sounds were added for during game play and for when PacMan is caught.

### Searching functions.
There are 3 functions running once every 60ms in the background.

1. One that checks to see if all the food has been eaten and the player has won.
2. One that checks to see if PacMan has been caught.
3. And One that checks to see if PacMan has caught any ghosts once a pill has been taken. In order for this to work 2. must be cancelled so that pac man does get caught by a ghost and caught at the same time

All 3 of these must be cancelled when the game is one or if PacMan is caught and then restarted if the game is restarted.

## Game Screen shots
Some screen shots from the game.

The start of the game.
![The start of the game](https://user-images.githubusercontent.com/51379192/61529921-85aba100-aa1a-11e9-8e75-d2627eca9877.png)

PacMan has taken a pill and the ghosts are running away they turn white.
![When PacMan has taken a pill and the ghosts are running away](https://user-images.githubusercontent.com/51379192/61529868-57c65c80-aa1a-11e9-977b-3c3410841009.png)

The player has won the game and has set a high score.
![When the player wins the game and sets a highscore](https://user-images.githubusercontent.com/51379192/61529826-41200580-aa1a-11e9-8e70-b0a2fdb2b8e9.png)

## Wins and Blockers

The biggest win was figuring out the complex ghost logic, which included figuring out the modulus logic for chasing PacMan. This really made the game much more realistic and enjoyable

I also had deep issues with clearing the setIntervals. Because 4 setIntervals had to be made for each ghosts cancelling then combined with calling functions became complex and took a day or solve to fix the big bugs with that.

| Time      | Task         |
| ------------- |:-------------:|
| **Day One**    | Choose Project game, play game, read about the rules, create grid.   |
|  **Day two**    | Get basic Pac moving around grid. Prevent him from walking into block. Read up about ghost logic. Get 1 ghost moving with very basic logic.      |
| **Day Three**  |    Get more advanced ghost movement, including path decision and not going back on its self. Pill to add move bias and Kill ghost.   |
| **Day Four**  |  Add 3 More Ghosts. Refactoring.  |
| **Day Five**  |  Continue adding 3 More Ghosts. Level Restart. Bugs with pills and timing issues.    |
| **Day Six**  |   Sound, Styling, Buttons, Score, Timer Bugs    |
| **Day Seven**  |  Deployment, ReadMe, prep for presentation     |

## THE BIG WINS.

1. I am really happy with the Ghost logic, I really like the solution I came up with. It sets the difficulty to a really good level
2. Timing was a very difficult so very happy it worked. Definitely could be improved very overkill with clearInterval. But still happy :D

## What have I learned.
- Layout for JS web browser project.
- A good approach to problem solving.
- A greater understanding of the length of time it takes to to certain things.
- That I am capable of completing some complex features that previously I did not think I was capable of.
- A host of key and other shortcuts that make me a more efficient coder.

## Moving Forward

- Responsive and touch screen play using arrow keys on screen.
- Using Object Orientated Programming. My code is very 'soupy' and can be simplified.
- Ghost logic improved using path finder & different ghost personalities.
- Cached local score Leader Board!
- Possibly level 2, 3, 4 etc..

---
# Contact

Freddie Hoy

Email: freddiehoy0@gmail.com

[Portfolio](https://freddiehoy.github.io/) | [LinkedIn](https://www.linkedin.com/in/freddie-hoy/) |
[GitHub](https://github.com/FreddieHoy?tab=repositories)
