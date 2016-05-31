'use strict';

const app = require('../app.js');

const success = (data) => {
  console.log(data);
  $('#sign-up').children().children('.bye').val("");
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = function (data) {
  app.user = data.user;
  console.log(app);
  $('#sign-in').children().children('.bye').val("");
};

const changePasswordSuccess = function (data) {
  console.log(data);
  $('#change-password').children().children('.bye').val("");
};
//here, we're basically saying we're calling our data app from now on to
//call things later, such as in sign out process

const signOutSuccess = function () {
  app.user = null;
  console.log(app);
};

const uiMethods = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
};

module.exports = uiMethods;
