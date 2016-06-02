'use strict';

//first, figure out if turn is even or odd. if even, "x", odd "o"
let turn = 0;
//initial board as a constant allows for the board to be reset as such each time a new game is started
const initialBoard = ['', '', '', '', '', '','', '', ''];
//this board can get updated
let boardArray = ['', '', '', '', '', '','', '', ''];

//figure out if turn is "x" or "o"
//if the value of turn is even, it is x. bold Player 1
//turn%2=0 when even, so player o turn%2 not 0 means odd so player x
const whoGoes = function () {
  let activeMove = 'x';
  if (turn%2 === 0) {
    activeMove = 'o';
  }
  return activeMove;
};






module.exports = {
  turn,
  boardArray,
  initialBoard,
  whoGoes,
};
