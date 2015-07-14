angular.module('services').controller('SingleContactController', SingleContactController);

function SingleContactController($scope, contactsService, agendasService, $stateParams, $state) {
   contactsService.getContacts().then(function(data){

      $scope.contact = _.find(data.data, function (chr) {
         console.log(chr.phoneNumber);
         return $stateParams.id === chr._id;
      });
   });

   $scope.deleteContact = function() {
      contactsService.removeContact($scope.contact._id).then(function(data){
         $state.go('contacts', {}, {reload: true});
      });
   };

}
