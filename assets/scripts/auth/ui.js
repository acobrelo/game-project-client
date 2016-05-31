'use strict';

const app = require('../app.js');

const success = (data) => {
  console.log(data);
  $('#sign-up').children().children('.bye').val("");
  $('p.correct').show("slow");
  $('.incorrect').hide();
};

const failure = (error) => {
  $('.incorrect').show("slow");
  console.error(error);
};

const signInSuccess = function (data) {
  app.user = data.user;
  console.log(app);
  $('#sign-in').children().children('.bye').val("");
  $('#sign-up').hide();
  $('#sign-in').hide();
  $('p.correct').hide();
  $('.incorrect').hide();
  $('h2.correct').show().text("Welcome, " + app.user.email);
  $('#sign-out').show();
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
  $('.correct').text("Goodbye!");
  $('#sign-out').hide();
};

const loopIn = function () {
  $('#sign-in').show();
};

const uiMethods = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  loopIn,
};

module.exports = uiMethods;
