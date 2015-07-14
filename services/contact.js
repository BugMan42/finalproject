angular.module('services').factory('contactsService', contactsService);

function contactsService($http, $q, AuthService) {
   var SERVER_URL = 'http://localhost:8080/';


   function getContacts() {
      var user = AuthService.getUser();
      var q = $q.defer();
      $http.get(SERVER_URL + 'user/' + user.data.user._id + '/contacts').then(function(data){
         q.resolve(data);
      }, function(){
         q.reject();
      });
      return q.promise;
   }

   /*
    function getcontacts() {
    var q = $q.defer();

    if(AuthService.user) {
    console.log(AuthService.getUser());
    $http.get(SERVER_URL + 'user/' + AuthService.getUser().user.data.user._id + '/contacts').then(function(data){
    q.resolve(data);
    }, function(){
    q.reject();
    });
    } else {
    q.reject();
    }
    return q.promise;
    }*/

   function addContact(newContact) {
      var q = $q.defer();
      var user = AuthService.getUser();
      //newAgenda.user = user.data.user._id;
      $http.post(SERVER_URL + 'user/' + user.data.user._id + '/contacts', newContact).then(function(data){
         q.resolve(data)
      }, function(){
         q.reject(data);
      });
      return q.promise;
   }

   function removeContact(id) {
      var user = AuthService.getUser();
      var q = $q.defer();
      $http.delete(SERVER_URL + 'user/' + user.data.user._id + '/contacts/' + id).then(function(data){
         q.resolve(data);
      }, function(data) {
         q.reject(data);
      });
      return q.promise;
   }

   return {
      getContacts: getContacts,
      addContact: addContact,
      removeContact: removeContact
   }
}
