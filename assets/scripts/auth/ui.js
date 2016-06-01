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

const changePasswordSuccess = function (data) {
  console.log(data);
  $('#account-options').find('.bye').val("");
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
