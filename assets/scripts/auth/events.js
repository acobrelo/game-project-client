'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const gameLogic = require('./gamelogic');

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
  .done(ui.success)
  .fail(ui.failure);
};

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.failure);
};

const onSignOut= function (event) {
  event.preventDefault();
  api.signOut()
  .done(ui.signOutSuccess)
  .fail(ui.failure);
};

const onChangePassword =  function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.success)
  .fail(ui.failure);
};

const onShowGame = function (event) {
  event.preventDefault();
  api.showGame()
  .done(ui.displayGame)
  .fail(ui.failure);
};


let isRowWon = 'unknown';
let winRow = function () {
    for (let i = 0; i < 9; i += 3) {
      if ((gameLogic.boardArray[i] === gameLogic.boardArray[i + 1]) && (gameLogic.boardArray[i] === gameLogic.boardArray[i + 2]) && (gameLogic.boardArray[i] !== '')) {
        isRowWon = 'yes';
        return;
    } else {
      isRowWon = 'unknown';
    }
  }
};

let isColWon = 'unknown';
let winCol = function () {
  for (let i = 0; i < 3; i++) {
    if ((gameLogic.boardArray[i] === gameLogic.boardArray[i + 3]) && (gameLogic.boardArray[i] === gameLogic.boardArray[i + 6]) && (gameLogic.boardArray[i] !== '')) {
      isColWon = 'yes';
      return;
    } else {
      isColWon = 'unknown';
    }
  }
};

let isDiaWon = 'unknown';
let winDia = function () {
  if ((gameLogic.boardArray[0] === gameLogic.boardArray[4]) && (gameLogic.boardArray[4] === gameLogic.boardArray[8]) && (gameLogic.boardArray[0] !== '')) {
    isDiaWon = 'yes';
  } else if ((gameLogic.boardArray[2] === gameLogic.boardArray[4]) && (gameLogic.boardArray[4] === gameLogic.boardArray[6]) && (gameLogic.boardArray[6] !== '')) {
    isDiaWon = 'yes';
    return;
} else {
  isDiaWon = 'unknown';
}
};

let won = 'false';
let bindToggle = $('.board').on('click');
const isWinner = function () {
  winRow();
  winCol();
  winDia();
  if ((isRowWon !== isColWon) || (isRowWon !== isDiaWon)) {
    won = 'true';
    $('.whoWon').html("Player " + gameLogic.currentMove + " wins!");
    bindToggle = $('.board').off('click');
  } else {
    won = 'false';
  }
  return;
};

let cell = 'unknown';
const onUpdateBoard = function () {
  let index = gameLogic.arrayKey.indexOf(cell);
  gameLogic.recentIndex = index;
  $('#toUpdate').find('.index').val(index);
  let whoseMove = gameLogic.turn;
  gameLogic.currentMove = gameLogic.player[whoseMove];
  let currentMove = gameLogic.currentMove;
  $('#' + cell).html(gameLogic.currentMove);
  gameLogic.turn = (gameLogic.turn + 1);
  $('#toUpdate').find('.move').val(currentMove);
  gameLogic.boardArray[index] = currentMove;
  isWinner();
  $('#toUpdate').find('.over').val(won);
  api.updateGame()
  .done(ui.displayGame)
  .fail(ui.failure);
};

const checkValid = function (event) {
  event.preventDefault();
  cell = $(this).attr('id');
  console.log(cell);
  let hi = $('#' + cell).html();
  if (hi === "") {
    $('.warn').hide();
   onUpdateBoard();
  } else {
    $('.warn').show();
  }
};

const onCreateGame = function (event) {
  event.preventDefault();
  api.createGame()
  .done(ui.newGameSuccess)
  .fail(ui.failure);
};

//Notes: this will take the square clicked, find the index of the ID in the gameLogic board
//simulation, make the form for API communication index is set,
//then increase the turn counter, use that to determine which player is going,
//then update the current move in the html that communicates with the API
//and update it all.
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#show-game').on('click', onShowGame);
  $('#create-game').on('click', onCreateGame);
  $('.board').on('click', checkValid);
};

module.exports = {
  addHandlers,
};
