'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const gameLogic = require('./gamelogic');

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

const onSetValues = function (event) {
  event.preventDefault();
  let cellID = $(this).attr('id');
  let index = gameLogic.arrayKey.indexOf(cellID);
  gameLogic.recentIndex = index;
  $('#toUpdate').find('.index').val(index);
  let whoseMove = gameLogic.turn;
  gameLogic.currentMove = gameLogic.player[whoseMove];
  let currentMove = gameLogic.currentMove;
  $('#' + cellID).html(gameLogic.currentMove);
  gameLogic.turn = (gameLogic.turn + 1);
  $('#toUpdate').find('.move').val(currentMove);
  console.log(currentMove);
};

//we know the recent index updates, we know the turn updates.
//the value of index is set on the html
//
const update = function (event) {
  event.preventDefault();
  api.updateGame()
  .done(ui.displayGame)
  .fail(ui.failure);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#show-game').on('click', onShowGame);
  $('#create-game').on('click', onCreateGame);
  $('.board').on('click', onSetValues);
  $('#toUpdate').on('click', update);
};

module.exports = {
  addHandlers,
};
