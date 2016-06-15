'use strict';

const app = require('../app.js');
const gameLogic = require('./gamelogic');

const success = (data) => {
  $('#account-options').find('.bye').val("");
  return data;
};

const signInSuccess = function (data) {
  app.user = data.user;
  let email = data.user.email;
  $('#account-options').find('.bye').val("");
  $('#account-options').modal('hide');
  //$('#select-house').modal('show');
  $('#house-selecta').show();
  $('#change-password').show();
  $('#sign-out').show();
  $('#sign-up').hide();
  $('#sign-in').hide();
  $('#heading').show();
  $('#index').show();
  $('#scoreboard').show();
  $('#welcome').html("Welcome, " + email);
  $('#houseSelect').show();
  return app;
};
//here, we're basically saying we're calling our data app from now on to
//call things later, such as in sign out process

const signOutSuccess = function () {
  $('#account-options').modal('hide');
  //$('#house-selecta').hide();
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
  $('.scoreboard').hide();
  $('#houseSelect').hide();
  $('#welcome').html("Welcome to Howarts Tic Tac Toe! Please sign in or sign up to begin.");
  app.user = null;
};

let count = 0;
let toUse = 'blank';
let finished = [];
let wonGames = [];

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
};

const uiMethods = {
  success,
  signInSuccess,
  signOutSuccess,
  newGameSuccess,
  indexGames,
};

module.exports = uiMethods;
