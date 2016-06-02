'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
//const gameLogic = require('./gamelogic');

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
  api.signOut()
  .done(ui.signOutSuccess)
  .fail(ui.failure);
};

const onChangePassword =  function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.success)
  .fail(ui.failure);
};

const onShowGame = function (event) {
  event.preventDefault();
  api.showGame()
  .done(ui.displayGame)
  .fail(ui.failure);
};

const onCreateGame = function (event) {
  event.preventDefault();
  api.createGame()
  .done(ui.newGameSuccess)
  .fail(ui.failure);
};

//make data invisible
//const onUpdateGame = function (event) {
  //event.preventDefault();
  //let data = getFormFields(event.target);
  //api.updateGame(data)
  //.done(ui.success)
  //.fail(ui.failure);
//};


const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#show-game').on('click', onShowGame);
  $('#create-game').on('click', onCreateGame);
  $('.board').click(function () {
    let index = $(this).attr('id');
    console.log(index);
  });
};

module.exports = {
  addHandlers,
};
