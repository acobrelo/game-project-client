'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const gameLogic = require('./gamelogic');

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
  .done(ui.success);
};

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .done(ui.signInSuccess);
};

const onChangePassword =  function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.success);
};

const onIndex = function (event) {
  event.preventDefault();
  api.indexOfGames()
  .done(ui.indexGames);
};

let currentHouse = 'none';
let xHouse = 'none';
let oHouse = 'none';
let xImg = 'none';
let oImg = 'none';
let ravImg = '<img src="assets/images/ravicon.png"/>';
let gryfImg = '<img src="assets/images/gryficon.png"/>';
let slythImg = '<img src="assets/images/slythicon.png"/>';
let huffImg = '<img src="assets/images/hufficon.png"/>';

const setxHouseImg = function () {
  if (xHouse === 'Gryffindor') {
    xImg = gryfImg;
  } else if (xHouse === 'Ravenclaw') {
    xImg = ravImg;
  } else if (xHouse === 'Slytherin') {
    xImg = slythImg;
  } else {
    xImg = huffImg;
  }
};

const setoHouseImg = function () {
  if (oHouse === 'Gryffindor') {
    oImg = gryfImg;
  } else if (oHouse === 'Ravenclaw') {
    oImg = ravImg;
  } else if (oHouse === 'Slytherin') {
    oImg = slythImg;
  } else {
    oImg = huffImg;
  }
};

const houseSet = function () {
  if (xHouse === 'none') {
    xHouse = currentHouse;
    currentHouse = 'none';
    $('#choose-house').html("Player 2, select your house");
    $('#' + xHouse).hide();
  } else {
    oHouse = currentHouse;
    $('.house').hide();
    $('#choose-house').hide();
    $('#choose-house').html("Player 1, select your house");
  }
};

const onSelectHouse = function (event) {
  event.preventDefault();
  currentHouse = $(this).attr('id');
  houseSet();
  setxHouseImg();
  setoHouseImg();
};

const resetHouses = function (event) {
  event.preventDefault();
  currentHouse = 'none';
  $('#choose-house').show();
  $('.house').show();
  $('#select-house').modal('show');
  xHouse = 'none';
  oHouse = 'none';
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
    $('.win-display').show();
    $('.whoWon').show();
    $('#keep-houses').show();
    $('.whoWon').html(house + " wins!");
    $('#switch-house').show();
    $('.board').off('click');
  } else if ((isRowWon === isColWon) && (isRowWon === isDiaWon) && (gameLogic.turn > 8)) {
    gameLogic.won = 'true';
    tie = 'true';
    $('.win-display').show();
    $('#keep-houses').show();
    $('.whoWon').show();
    $('.whoWon').html("Tie game!");
    $('#switch-house').show();
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
    $('.x-Wins').html("Player 1 Score: " + xInc);
  } else if (($('#toUpdate').find('.over').val() === 'true') && (gameLogic.currentMove === 'o') && (tie === 'false')) {
    oInc = 1 + gameLogic.oWins++;
    $('.o-Wins').html("Player 2 Score: " + oInc);
  }
  return;
};

let cell = 'unknown';

const playerImg = function () {
  if (gameLogic.currentMove === 'x') {
    $('#' + cell).html(xImg);
  } else {
    $('#' + cell).html(oImg);
  }
};

const onUpdateBoard = function () {
  let index = gameLogic.arrayKey.indexOf(cell);
  gameLogic.recentIndex = index;
  $('#toUpdate').find('.index').val(index);
  let whoseMove = gameLogic.turn;
  gameLogic.currentMove = gameLogic.player[whoseMove];
  let currentMove = gameLogic.currentMove;
  playerImg();
  gameLogic.turn = (gameLogic.turn + 1);
  $('#toUpdate').find('.move').val(currentMove);
  gameLogic.boardArray[index] = currentMove;
  isWinner();
  $('#toUpdate').find('.over').val(gameLogic.won);
  winCounter();
  api.updateGame()
  .done(ui.success);
};

const checkValid = function (event) {
  event.preventDefault();
  cell = $(this).attr('id');
  let hi = $('#' + cell).html();
  if (hi !== "") {
    $('.warn').show();
  } else {
    onUpdateBoard();
    $('.warn').hide();
  }
  console.log(hi);
};

const onCreateGame = function (event) {
  event.preventDefault();
  $('.win-display').hide();
  $('#update-game').show();
  $('#switch-house').hide();
  $('#select-house').modal('hide');
  $('.scoreboard').show();
  $('.board').on('click', checkValid);
  api.createGame()
  .done(ui.newGameSuccess);
};

//Notes: this will take the square clicked, find the index of the ID in the gameLogic board
//simulation, make the form for API communication index is set,
//then increase the turn counter, use that to determine which player is going,
//then update the current move in the html that communicates with the API
//and update it all.

const onSignOut= function (event) {
  event.preventDefault();
  $('.board').html("");
  currentHouse = 'none';
  xHouse = 'none';
  oHouse = 'none';
  $('#choose-house').show();
  $('.house').show();
  api.signOut()
  .done(ui.signOutSuccess);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#index').on('click', onIndex);
  $('.create-game').on('click', onCreateGame);
  $('.house').on('click', onSelectHouse);
  $('#switch-house').on('click', resetHouses);
};

module.exports = {
  addHandlers,
};
