'use strict';

//first, figure out if turn is even or odd. if even, "x", odd "o"
let turn = 0;
//initial board as a constant allows for the board to be reset as such each time a new game is started
const initialBoard = ['', '', '', '', '', '','', '', ''];
const arrayKey = ['a1','a2','a3','b1','b2','b3','c1','c2','c3'];
//this board can get updated
let boardArray = ['', '', '', '', '', '','', '', ''];
let recentIndex = null;

const player = ['x','o','x','o','x','o','x','o','x'];
let currentMove = null;
let rowWin;
let colWin;
let diaWin;

const isWinner = function () {
  if ((rowWin === true || colWin === true || diaWin === true) && (turn === 9)) {
    console.log("game is won");
  } else {
    console.log("keep going");
  }
  return isWinner;
};

const winRow = function () {
  for (let i = 0; i < 9; i+=3) {
    if (boardArray[i] === boardArray[i + 1] === boardArray[i + 2]) {
      rowWin = true;
    } else {
      rowWin = false;
    }
  }
    return rowWin;
};

const winCol = function () {
  for (let i = 0; i < 3; i+=1) {
    if (boardArray[i] === boardArray[i + 3] === boardArray[i + 3]) {
      colWin = true;
    } else {
      colWin = false;
    }
  }
  return colWin;
};


//for win col, i needs to be less than 3

const winDia = function () {
  if ((boardArray[0] === boardArray[4] === boardArray[8]) || (boardArray[2] === boardArray[4] === boardArray[6])) {
    diaWin = true;
  } else {
    diaWin = false;
    }
  return diaWin;
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
  diaWin,
  colWin,
  rowWin,
  isWinner,
};
