angular.module('services').controller('AgendasController', AgendasController);

function AgendasController($scope, AuthService, agendasService, $state) {
   // Code to control the new Agenda view
   $scope.formData = { };

   $scope.createAgenda = function () {
      //console.log($scope.formData.name +" "+ $scope.formData.company);
      var newAgenda;
      if ($scope.formData.company) {
         newAgenda = {
            name: $scope.formData.name,
            company: $scope.formData.company
         };
      }
      else {
         newAgenda = {
            name: $scope.formData.name
         };
      }

      if (AuthService.getUser().data.user) {
         agendasService.addAgenda(newAgenda);
         //$scope.formAgenda.$setPristine();
         $state.go('agendas', {}, {reload : true});
      }
      else {
         $state.go('signin', {}, {reload : true});
      }
   };

   $scope.search = {};

   agendasService.getAgendas().then(function(data){
      console.log("yiiiha");
      if (AuthService.getUser().data.user) {
         $scope.agendaslist = data.data;
      }
      else {
         console.log("ni aqui");
         $state.go('signin', {}, {reload : true});
      }
   });







}