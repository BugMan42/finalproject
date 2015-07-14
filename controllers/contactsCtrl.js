angular.module('services').controller('ContactsController', ContactsController);

function ContactsController($scope, contactsService, $state) {
   // Code to control the new Agenda view
   $scope.formData = { };

   $scope.createContact = function () {
      //console.log($scope.formData.name +" "+ $scope.formData.company);
      var newContact = newContact = {
            name: $scope.formData.name,
            surname: $scope.formData.surname,
            phoneNumber: $scope.formData.phone
      };
      if ($scope.formData.company) {
         newContact.company = $scope.formData.company;
      }
      if ($scope.formData.email) {
         newContact.email = $scope.formData.email;
      }
      if (AuthService.getUser().data.user) {
         contactsService.addContact(newContact);
         //$scope.formAgenda.$setPristine();
         $state.go('contacts', {}, {reload : true});
      }
      else {
         $state.go('signin', {}, {reload : true});
      }
   };

   $scope.search = {};

   contactsService.getContacts().then(function(data) {
      $scope.contactslist = data.data;
   }, function(error) {
      $state.go('signin', {}, {reload : true});
   });

}
