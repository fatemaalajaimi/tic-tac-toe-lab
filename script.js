/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board = ['', '', '', '', '', '', '', '', '']
let turn = 'x'
let winner = false
let tie = false
let xWins = 0
let oWins = 0
let msg

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
const xwinsHTML = document.querySelector('.x-wins')
const owinsHTML = document.querySelector('.o-wins')

/*-------------------------------- Functions --------------------------------*/

const render = () => {
  updateBoard()
  updateMessage()
}

const updateBoard = () => {
  for (let i = 0; i < board.length; i++) {
    squareEls[i].textContent = board[i]
  }
}

const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.textContent = `It is ${turn} turn`
  } else if (winner === false && tie === true) {
    messageEl.textContent = 'It is a tie'
  } else {
    messageEl.textContent = `Congrats, Player ${turn} won`
    if (turn === 'x') {
      xWins++
    } else {
      oWins++
    }
    xwinsHTML.innerText = xWins
    owinsHTML.innerText = oWins
  }
}

const placePiece = (index) => {
  board[index] = turn
  squareEls[index].textContent = turn
}

const checkForWinner = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    if (
      board[winningCombos[i][0]] !== '' &&
      board[winningCombos[i][0]] === board[winningCombos[i][1]] &&
      board[winningCombos[i][0]] === board[winningCombos[i][2]]
    ) {
      winner = true
    }
  }
}

const checkForTie = () => {
  if (winner) {
    return
  }
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== '') {
      tie = true
    } else {
      tie = false
      return
    }
  }
}

const switchPlayerTurn = () => {
  if (winner) {
    return
  }
  if (turn === 'x') {
    turn = 'o'
  } else {
    turn = 'x'
  }
}

const handleClick = (event) => {
  let squareIndex = event.target.id

  if (
    board[event.target.id] === 'x' ||
    board[event.target.id] === 'o' ||
    winner === true
  ) {
    return
  }

  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'x'
  winner = false
  tie = false
  xwinsHTML.innerText = xWins
  owinsHTML.innerText = oWins
  render()
}

/*----------------------------- Event Listeners -----------------------------*/

init()

for (let i = 0; i < squareEls.length; i++) {
  squareEls[i].addEventListener('click', handleClick)
}

resetBtnEl.addEventListener('click', init)
