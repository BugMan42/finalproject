angular.module('services', ['ui.router', 'ngMessages','ui.bootstrap']).config(Config);
//angular.module('services').run(function(AuthService) {
   //authservice.init() -> funcio que carrega el meu usuario.constructor

   //$state.go(home);
//});

function Config($stateProvider, $urlRouterProvider) {

    $stateProvider

       .state('home', {
           url: '/home',
           templateUrl: 'templates/home.html'
         })
       .state('signin', {
         url: '/signin',
         templateUrl: 'templates/login.html',
         controller: 'AuthController'
       })
       .state('signup', {
           url: '/signup',
           templateUrl: 'templates/signup.html',
           controller: 'SignUpController'
       })

       //Agenda
       .state('newAgenda', {
          url: '/newagenda',
          templateUrl: 'templates/newagenda.html',
          controller: 'AgendasController'
       })
       .state('agendas', {
          url: '/agendas',
          templateUrl: 'templates/agendas.html',
          controller: 'AgendasController'
       }).state('agendas.single', {
          url: '/:id',
          templateUrl: 'templates/singleagenda.html',
          controller: 'SingleAgendaController'
       })

       //Contact
       .state('newContact', {
          url: '/newcontact',
          templateUrl: 'templates/newcontact.html',
          controller: 'ContactsController'
       })
       .state('contacts', {
          url: '/contacts',
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsController'
       })
       .state('contacts.single', {
          url: '/:id',
          templateUrl: 'templates/singlecontact.html',
          controller: 'SingleContactController'
       })
    $urlRouterProvider.otherwise('/home');
}
