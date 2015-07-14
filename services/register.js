angular.module('services').factory('SignUpService', SignUpService);

function SignUpService($http, $window,  $q) {

    var SERVER_URL = 'http://localhost:8080/user/';

    function register(username, password, email) {
        var q = $q.defer();
        $http.post(SERVER_URL, {username: username, password: password, email: email}).then(function(data) {
            q.resolve();
        }, function(err) {
            console.log(err);
            console.log('FAILED');
            q.reject();
        });
        return q.promise;
    }

    return {
        register: register
    }
}