'use strict';
const app = require('../app.js');
const gameLogic = require('./gamelogic');
const events = require('./events.js');

const signUp = (data) => {
  return $.ajax ({
    url: app.host + '/sign-up/',
    method: 'POST',
    data: data,
  });
};

const signIn = (data) => {
return $.ajax ({
  url: app.host + '/sign-in/',
  method: 'POST',
  data: data,
});
};

const signOut = () => {
return $.ajax ({
  url: app.host + '/sign-out/' + app.user.id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});
};

const changePassword = function (data) {
  return $.ajax ({
    url: app.host + '/change-password/' + app.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
  };

const indexOfGames = function () {
  return $.ajax({
    url: app.host + '/games[?over=]/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const showGame = function () {
  return $.ajax({
    url: app.host + '/games/' + app.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const createGame = function (data) {
  return $.ajax ({
    url: app.host + '/games/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};
//no data: data used here, check on that later?

//notes on adding player: going to bind it to one of the buttons for char select
//when you call addplayer, acts on form, data is whatever is in the form

const updateGame = function () {
  let index = gameLogic.recentIndex;
  let move = gameLogic.currentMove;
  let won = events.won;
  return $.ajax ({
    url: app.host + '/games/' + app.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "game": {
	        "cell": {
	          "index": index,
	          "value": move,
	        },
	        "over": won,
	      }
	    },
  });
};

//app.user.is works even though it isnt defined because it's
//defined when you sign in so that's FINE to use. Ditto the token.
//it's already there. so relax. app.host app is different than the app.user app

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  indexOfGames,
  showGame,
  createGame,
  updateGame,
};
