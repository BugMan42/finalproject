angular.module('services').controller('SingleAgendaController', SingleAgendaController);

function SingleAgendaController($scope, agendasService, $stateParams, $state) {
   agendasService.getAgendas().then(function(data){

      $scope.agenda = _.find(data.data, function (chr) {

         return $stateParams.id === chr._id;
      });


      agendasService.getContacts($scope.agenda._id).then(function(dt){
         $scope.contactlist = dt.data;
      });


   });

   $scope.deleteAgenda = function() {
      agendasService.removeAgenda($scope.agenda._id).then(function(data){
         $state.go('agendas', {}, {reload: true});
      });
   };

   $scope.addPhone = function () {
      //console.log($scope.formData.phone);
      var phone = {
         phoneNumber: $scope.formData.phone
      };
      agendasService.addPhone(phone,$scope.agenda._id);
      $state.reload();
      //$state.go('agendas', {}, {reload : true});
   };

   $scope.deleteContactAgenda = function(index) {
      var phone = {
         phoneNumber: $scope.contactlist[index].phoneNumber
      };
      agendasService.removeContact(phone, $scope.agenda._id).then(function(data){
         //$state.go('contacts', {}, {reload: true});
         $state.reload();
      });
   }
}
