'use strict';

const app = require('../app.js');
const gameLogic = require('./gamelogic');

const success = (data) => {
  console.log(data);
  $('#account-options').find('.bye').val("");
};

const failure = (error) => {
  console.error(error);
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
  console.log(data);
};

const newGameSuccess = function (data) {
  app.game = data.game;
  gameLogic.boardArray = gameLogic.initialBoard;
  $('#update-game').children().children('.board').text("");
  console.log(app);
};

//const isWinner = function (){
//  if gameLogic.
//}


//newGameSuccess meansresetting the text in the baord to initial board logic
//const addPlayerSuccess = function (data) {
  //console.log("hi" + data);
//};

const uiMethods = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  displayGame,
  newGameSuccess,
  //whichSquare,
};

module.exports = uiMethods;
