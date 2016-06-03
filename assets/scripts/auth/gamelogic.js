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


//figure out if turn is "x" or "o"
//if the value of turn is even, it is x. bold Player 1
//turn%2=0 when even, so player o turn%2 not 0 means odd so player x.
//this works



module.exports = {
  turn,
  boardArray,
  initialBoard,
  arrayKey,
  recentIndex,
  player,
  currentMove,
};
