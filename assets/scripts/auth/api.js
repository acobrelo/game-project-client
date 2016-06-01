'use strict';
const app = require('../app.js');

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

const createGame = function () {
  return $.ajax ({
    url: app.host + '/games/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
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
  createGame,
};
