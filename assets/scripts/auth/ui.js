'use strict';

const app = require('../app.js');
const gameLogic = require('./gamelogic');

const success = (data) => {
  $('#account-options').find('.bye').val("");
  return data;
};

let count = 0;
let toUse = 'blank';
let finished = [];
let wonGames = [];

const signInSuccess = function (data) {
  app.user = data.user;
  let email = data.user.email;
  count = 0;
  toUse = 'blank';
  finished = [];
  wonGames = [];
  $('.warn').hide();
  $('#account-options').find('.bye').val("");
  $('#account-options').modal('hide');
  $('#house-selecta').show();
  $('.acc-op-button').html("Account Options");
  $('#gameHist').show();
  $('#create-game').show();
  $('.top-of-page').show();
  $('#change-password').show();
  $('#sign-out').show();
  $('#sign-up').hide();
  $('#sign-in').hide();
  $('#heading').show();
  $('#index').show();
  $('#scoreboard').show();
  $('.whoWon').show();
  $('#welcome').html("Welcome, " + email);
  $('#houseSelect').show();
  $('#select-house').modal('show');
  $('#displayGameData').show();
  $('#keep-houses').show();
  return app;
};
//here, we're basically saying we're calling our data app from now on to
//call things later, such as in sign out process

const signOutSuccess = function () {
  gameLogic.boardArray = ['', '', '', '', '', '','', '', ''];
  gameLogic.xWins = 0;
  gameLogic.oWins = 0;
  $('#gameHist').hide();
  $('#account-options').modal('hide');
  $('.acc-op-button').html("Welcome to Howarts Tic Tac Toe! Click here to sign in or sign up.");
  $('#change-password').hide();
  $('.whoWon').hide();
  $('#sign-out').hide();
  $('#sign-up').show();
  $('#sign-in').show();
  $('#heading').hide();
  $('#index').hide();
  $('.top-of-page').hide();
  $('.o-Wins').html("Player 2 Score: 0");
  $('.x-Wins').html("Player 1 Score: 0");
  $('#update-game').hide();
  $('#create-game').hide();
  $('#displayGameData').html("");
  $('.win-display').hide();
  $('#switch-house').hide();
  $('.scoreboard').hide();
  $('#houseSelect').hide();
  $('#welcome').html("");
  $('#keep-houses').hide();
  $('#toUpdate').find('.index').val("");
  $('#toUpdate').find('.move').val("");
  $('#toUpdate').find('.over').val("");
  $('.whoWon').html("");
  app.user = null;
};

const finishedArray = function () {
  for (let i = 0; i < count; i++) {
    if (toUse[i].over !== 'blank') {
      finished.push(toUse[i].over + 'a');
    }
  }
};

const countTrue = function () {
  for (let i = 0; i < count; i++) {
    if (finished[i] === 'truea') {
      wonGames.push('x');
    }
  }
};

const indexGames = function (data) {
  finished = [];
  wonGames = [];
  count = data.games.length;
  toUse = data.games;
  finishedArray();
  countTrue();
  $('#displayGameData').html('Started: ' + finished.length + ' Completed: ' + wonGames.length);
};

const newGameSuccess = function (data) {
  app.game = data.game;
  gameLogic.boardArray = ['', '', '', '', '', '','', '', ''];
  gameLogic.turn = 0;
  gameLogic.recentIndex = null;
  $('#update-game').children().children('.board').text("");
  $('#toUpdate').find('.index').val("");
  $('#toUpdate').find('.move').val("");
  $('#toUpdate').find('.over').val("");
  $('.whoWon').html("");
  $('.whoWon').hide();
};

const uiMethods = {
  success,
  signInSuccess,
  signOutSuccess,
  newGameSuccess,
  indexGames,
};

module.exports = uiMethods;
