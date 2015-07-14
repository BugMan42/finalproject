angular.module('services').factory('AuthService', AuthService);

function AuthService($http, $window,  $q) {

  var SERVER_URL = 'http://localhost:8080/authentication/';
  var user = {data: {}, islogged: false};

  function login(username, password) {
    var q = $q.defer();
    $http.post(SERVER_URL, {username: username, password: password}).then(function(data) {
       user.data = data.data;
       $window.sessionStorage.token = user.data.token;
       user.islogged = true;
       console.log(user.data);
       q.resolve();
    }, function() {
       console.log('FAILED');
       q.reject();
    });
    return q.promise;
  }

  function getUser() {
      return user;
  }

  function logout() {
      user.data = {};
      user.islogged = false;
      $window.sessionStorage.token = null;
  }
   function islogged() {
      return user.islogged;
   }

  return {
     login: login,
     getUser: getUser,
     logout: logout,
     islogged: islogged
  }
}