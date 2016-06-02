'use strict';

const app = require('../app.js');

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
  console.log(app);
};

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
};

module.exports = uiMethods;
