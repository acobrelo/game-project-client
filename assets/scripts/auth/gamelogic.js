'use strict';
//const events = require('./events');

let turn = 0;
//initial board as a constant allows for the board to be reset as such each time a new game is started
const initialBoard = ['', '', '', '', '', '','', '', ''];
const arrayKey = ['a1','a2','a3','b1','b2','b3','c1','c2','c3'];
//this board can get updated
let boardArray = ['', '', '', '', '', '','', '', ''];
let recentIndex = null;

const player = ['x','o','x','o','x','o','x','o','x'];
let currentMove = null;


let xWins = 0;
let oWins = 0;

let won = 'unknown';
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
  xWins,
  oWins,
  won,
};
