angular.module('services').factory('agendasService', agendasService);

function agendasService($http, $q, AuthService) {
   var SERVER_URL = 'http://localhost:8080/';


   function getAgendas() {
      var q = $q.defer();
      if (AuthService.getUser().data.user) {
         var user = AuthService.getUser();
         $http.get(SERVER_URL + 'user/' + user.data.user._id + '/agendas').then(function (data) {
            q.resolve(data);
         }, function () {
            q.reject();
         });
      }
      else {
         q.reject();
      }
      return q.promise;
   }

   /*
   function getAgendas() {
      var q = $q.defer();

      if(AuthService.user) {
         console.log(AuthService.getUser());
         $http.get(SERVER_URL + 'user/' + AuthService.getUser().user.data.user._id + '/agendas').then(function(data){
            q.resolve(data);
         }, function(){
            q.reject();
         });
      } else {
         q.reject();
      }
      return q.promise;
   }*/

   function addAgenda(newAgenda) {
      var q = $q.defer();
      var user = AuthService.getUser();
      newAgenda.user = user.data.user._id;
      $http.post(SERVER_URL + 'user/' + user.data.user._id + '/agendas', newAgenda).then(function(data){
         q.resolve(data)
      }, function(){
         q.reject(data);
      });
      return q.promise;
   }

   function removeAgenda(id) {
      var user = AuthService.getUser();
      var q = $q.defer();
      $http.delete(SERVER_URL + 'user/' + user.data.user._id + '/agendas/' + id).then(function(data){
         q.resolve(data);
      }, function(data) {
         q.reject(data);
      });
      return q.promise;
   }

   function addPhone(phone, agenda_id) {
      var q = $q.defer();
      var user = AuthService.getUser();
      $http.post(SERVER_URL + 'user/' + user.data.user._id + '/agendas/'+agenda_id, phone).then(function(data){
         q.resolve(data)
      }, function(){
         q.reject(data);
      });
      return q.promise;
   }

   function getContacts(agenda_id) {
      var user = AuthService.getUser();
      var q = $q.defer();
      $http.get(SERVER_URL + 'user/' + user.data.user._id + '/agendas/'+agenda_id).then(function(data){
         q.resolve(data);
      }, function(){
         q.reject();
      });
      return q.promise;
   }

   function removeContact(phone1, agenda_id) {
      var user = AuthService.getUser();
      var q = $q.defer();
      $http.post(SERVER_URL + 'user/' + user.data.user._id + '/agendas/deleteContact/'+agenda_id, phone1).then(function(data){
         q.resolve(data);
      }, function(){
         q.reject();
      });
      return q.promise;
   }


   return {
      removeContact: removeContact,
      getContacts: getContacts,
      addPhone: addPhone,
      getAgendas: getAgendas,
      addAgenda: addAgenda,
      removeAgenda: removeAgenda
   }
}
