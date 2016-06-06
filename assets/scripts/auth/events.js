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
  $('#house-selecta').hide();
  $('#change-password').hide();
  $('#sign-out').hide();
  $('#sign-up').show();
  $('#sign-in').show();
  $('#heading').hide();
  $('#index').hide();
  $('#house-set-a').hide();
  $('#house-set-b').hide();
  $('#update-game').hide();
  $('#create-game').hide();
  $('#displayGameData').hide();
  $('.whoWon').hide();
  $('#switch-house').hide();
  $('#welcome').html("Welcome to Howarts Tic Tac Toe! Please sign in or sign up to begin.");
  api.signOut()
  .done(ui.success)
  .fail(ui.failure);
};

const onChangePassword =  function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.success)
  .fail(ui.failure);
};

const onIndex = function (event) {
  event.preventDefault();
  api.indexOfGames()
  .done(ui.indexGames)
  .fail(ui.failure);
};

let currentHouse = 'none';
let xHouse = 'none';
let oHouse = 'none';
let ready = 'no';

const houseSet = function () {
  if (xHouse === 'none') {
    xHouse = currentHouse;
    currentHouse = 'none';
    $('#house-set-a').html("Player 1 is " + xHouse);
    $('#house-set-a').show();
    $('#choose-house').html("Player 2, select your house");
    $('#' + xHouse).hide();
  } else {
    oHouse = currentHouse;
    $('#house-set-b').html("Player 2 is " + oHouse);
    $('#house-set-b').show();
    $('.house').hide();
    ready = 'yes';
    $('#update-game').show();
    $('#create-game').show();
    $('#choose-house').hide();
    $('#choose-house').html("Player 1, select your house");
  }
};

const onSelectHouse = function (event) {
  event.preventDefault();
  currentHouse = $(this).attr('id');
  console.log(currentHouse);
  houseSet();
};

const resetHouses = function (event) {
  event.preventDefault();
  currentHouse = 'none';
  $('#choose-house').show();
  $('.house').show();
  xHouse = 'none';
  oHouse = 'none';
  ready = 'no';
  $('#house-set-a').hide();
  $('#house-set-b').hide();
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

let tie = 'false';

let house = 'unknown';

const houseWinner = function () {
  if (gameLogic.currentMove === 'x') {
    house = xHouse;
  } else {
    house = oHouse;
  }
};

const isWinner = function () {
  winRow();
  winCol();
  winDia();
  if ((isRowWon !== isColWon) || (isRowWon !== isDiaWon)) {
    gameLogic.won = 'true';
    houseWinner();
    $('.whoWon').html(house + " wins!");
    $('#switch-house').show();
    $('.board').off('click');
  } else if ((isRowWon === isColWon) && (isRowWon === isDiaWon) && (gameLogic.turn > 8)) {
    gameLogic.won = 'true';
    tie = 'true';
    $('.whoWon').html("Tie game!");
    $('.board').off('click');
  } else {
    gameLogic.won = 'false';
    tie = 'false';
  }
  return;
};

const winCounter = function () {
  let xInc;
  let oInc;
  if (($('#toUpdate').find('.over').val() === 'true') && (gameLogic.currentMove === 'x') && (tie === 'false')) {
    xInc = 1 + gameLogic.xWins++;
    $('.x-Wins').html("Player X Score: " + xInc);
  } else if (($('#toUpdate').find('.over').val() === 'true') && (gameLogic.currentMove === 'o') && (tie === 'false')) {
    oInc = 1 + gameLogic.oWins++;
    $('.o-Wins').html("Player O Score: " + oInc);
  }
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
  $('#toUpdate').find('.over').val(gameLogic.won);
  winCounter();
  api.updateGame()
  .done(ui.success)
  .fail(ui.failure);
};

const checkValid = function (event) {
  event.preventDefault();
  cell = $(this).attr('id');
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
  $('#update-game').show();
  $('#switch-house').hide();
  $('.board').on('click', checkValid);
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
  $('#index').on('click', onIndex);
  $('#create-game').on('click', onCreateGame);
  $('.house').on('click', onSelectHouse);
  $('#switch-house').on('click', resetHouses);
};

module.exports = {
  addHandlers,
};
