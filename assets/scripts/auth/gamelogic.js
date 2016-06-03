'use strict';

//first, figure out if turn is even or odd. if even, "x", odd "o"
let turn = 0;
//initial board as a constant allows for the board to be reset as such each time a new game is started
const initialBoard = ['', '', '', '', '', '','', '', ''];
const arrayKey = ['a1','a2','a3','b1','b2','b3','c1','c2','c3'];
//this board can get updated
let boardArray = ['o', '', 'x', '', 'o', 'o','', 'x', 'o'];
let recentIndex = null;

const player = ['x','o','x','o','x','o','x','o','x'];
let currentMove = null;

let winRow = {
  isWon: false,
  checkIt: function () {
  for (let i = 0; i < boardArray.length; i += 3) {
    if ((boardArray[i] === boardArray[i + 1]) && (boardArray[i] === boardArray[i + 2]) && (boardArray[i] !== '')) {
      winRow.isWon = true;
    }
  }
},
};

let winCol = {
  isWon: false,
  checkIt: function () {
  for (let i = 0; i < 3; i+=1) {
    if ((boardArray[i] === boardArray[i + 3]) && (boardArray[i] === boardArray[i + 6]) && (boardArray[i] !== '')) {
      winCol.isWon = true;
    }
  }
},
};


let winDia = {
  isWon: false,
  checkIt: function () {
  if (((boardArray[0] === boardArray[4]) && (boardArray[4] === boardArray[8])) || ((boardArray[2] === boardArray[4]) && (boardArray[4]=== boardArray[6]))) {
    winDia.isWon = true;
  }
},
};

const isWinner = function () {
  if ((winRow.isWon === true || winCol.isWon === true || winDia.isWon === true)) {
    console.log("game is won");
  } else {
    console.log("keep going");
  }
};

//next, what I want to do is display win condition. update the board array to reflect the
//current state, then set win conditions.



module.exports = {
  turn,
  boardArray,
  initialBoard,
  arrayKey,
  recentIndex,
  player,
  currentMove,
  winDia,
  winRow,
  winCol,
  isWinner,
};
