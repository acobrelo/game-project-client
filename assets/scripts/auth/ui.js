'use strict';

const app = require('../app.js');
const gameLogic = require('./gamelogic');

const success = (data) => {
  console.log(data);
  $('#account-options').find('.bye').val("");
};

const failure = (error) => {
  console.log(error);
};

const signInSuccess = function (data) {
  app.user = data.user;
  console.log(app);
  $('#account-options').find('.bye').val("");
};
//here, we're basically saying we're calling our data app from now on to
//call things later, such as in sign out process

const signOutSuccess = function () {
  app.user = null;
  console.log(app);
};

const displayGame = function (data) {
  let see = data.game.id;
  $('#displayGameData').text(see);
  console.log(see);
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
  console.log(wonGames);
};

const indexGames = function (data) {
  finished = [];
  wonGames = [];
  count = data.games.length;
  toUse = data.games;
  finishedArray();
  countTrue();
  $('#displayGameData').html('You have started ' + finished.length + ' games and completed ' + wonGames.length);
  console.log(finished.length);
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
  console.log(app);
};

const uiMethods = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  displayGame,
  newGameSuccess,
  indexGames,
};

module.exports = uiMethods;
