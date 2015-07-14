angular.module('services').controller('NavBarController', NavBarController);

//sense servei
function NavBarController($scope, AuthService, $state) {
    $scope.log = AuthService.getUser();


    $scope.navButton = {
        showsignin: !AuthService.islogged(),
        showsignup: !AuthService.islogged(),
        showlogout: AuthService.islogged()
    };

    $scope.logout = function() {
        AuthService.logout();
        $state.go('home');
    };


}
