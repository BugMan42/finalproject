angular.module('services').controller('SignUpController', SignUpController);

function SignUpController($scope, SignUpService, $state) {
    $scope.registerData = {};

    $scope.submit = function() {
        SignUpService.register($scope.registerData.username, $scope.registerData.password, $scope.registerData.email).then(function() {
            $state.go('dashboard');
            console.log("yeah");
        }, function(err) {
            console.log(err);
            console.log('FFAILED');
        });
    }
}