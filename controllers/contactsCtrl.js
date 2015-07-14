angular.module('services').controller('ContactsController', ContactsController);

function ContactsController($scope, AuthService, contactsService, $state) {
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
      contactsService.addContact(newContact);
      //$scope.formAgenda.$setPristine();
      $state.go('contacts', {}, {reload : true});
   };

   $scope.search = {};

   contactsService.getContacts().then(function(data){
      $scope.contactslist = data.data;
   });
}
