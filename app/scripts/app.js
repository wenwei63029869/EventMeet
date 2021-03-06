'use strict';

/**
 * @ngdoc overview
 * @name eventMeetApp
 * @description
 * # eventMeetApp
 *
 * Main module of the application.
 */

angular
 .module('eventMeetApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ngSanitize',
  'ngTouch',
  'angular-flippy',
  'satellizer',
  "ngTable",
  'BustItFilter'
])
.config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('homepage', {
      url: '/',
      views: {
        'header': {
          templateUrl: 'views/_header.html',
          controller: 'HeaderCtrl',
          resolve: {
            authPromise: ['AuthService', function(AuthService){
              return AuthService.getProfile();
            }]
          }
        },
        'main': {
          templateUrl: 'views/_homepage.html',
          controller: 'HomepageCtrl'
        },
        'footer': {
          templateUrl: 'views/_footer.html',
          controller: 'FooterCtrl'
        }
      }
    })
    .state('rooms', {
      url: '/rooms',
      views: {
        'header': {
          templateUrl: 'views/_header.html',
          controller: 'HeaderCtrl',
          resolve: {
            authPromise: ['AuthService', function(AuthService){
              return AuthService.getProfile();
            }]
          }
        },
        'main': {
          templateUrl: 'views/_rooms.html',
          controller: 'RoomsCtrl'
        },
        'footer': {
          templateUrl: 'views/_footer.html',
          controller: 'FooterCtrl'
        }
      },
      resolve: {
        roomsPromise: ['RoomsService', function(RoomsService){
          return RoomsService.getAll();
        }],
        checkLoginIn: ['$auth', function($auth){
          if (!$auth.isAuthenticated()) {
            $location.path('/').replace();
          }
        }]
      }
    })
    .state('room', {
      url: '/rooms/{id}',
      views: {
        'header': {
          templateUrl: 'views/_header.html',
          controller: 'HeaderCtrl',
          resolve: {
            authPromise: ['AuthService', function(AuthService){
              return AuthService.getProfile();
            }]
          }
        },
        'main': {
          templateUrl: 'views/_room.html',
          controller: 'RoomCtrl'
        },
        'footer': {
          templateUrl: 'views/_footer.html',
          controller: 'FooterCtrl'
        }
      },
      resolve: {
        room: ['$stateParams', 'RoomsService', function($stateParams, RoomsService) {
          return RoomsService.get($stateParams.id);
        }],
        checkLoginIn: ['$auth', function($auth){
          console.log("hit it")
          if (!$auth.isAuthenticated()) {
            console.log("not login")
            $location.path('/').replace();
          }
        }]
      }

    });

    $authProvider.facebook({
      clientId: '1763699113853883',
      name: 'facebook',
      url: 'http://localhost:3000/api/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      redirectUri: window.location.origin + '/',
      requiredUrlParams: ['display', 'scope'],
      scope: ['email'],
      scopeDelimiter: ',',
      display: 'popup',
      type: '2.0',
      popupOptions: { width: 580, height: 400 }
    })

  });



/**
 * rooms table js
 */
$(document).ready(function () {
  $(".room-button").click(function(){
    console.log("hit room button");
    $("#header").css("background-color", "#383b43");
  })

  $(".home-button").click(function(){
    console.log("hit home button");
    $("#header").css("background-color", "transparent");
  })
});