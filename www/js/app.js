// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('wish', ['ionic','ngCordova','firebase'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }


      $rootScope.$on("$cordovaLocalNotification:click", function(notification, state) {
    
          window.location.href = "#/home/status";
      });

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
      $ionicConfigProvider.tabs.position('bottom');


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home', {
    url: '/home',
    abstract: true,
    cache:false,
    templateUrl: 'templates/home.html'
  })

  // Each tab has its own nav history stack:

  .state('home.status', {
    url: '/status',
    views: {
      'status': {
        templateUrl: 'templates/status.html',
        controller: 'StatusCtrl'
      }
    },
    cache:false
  })

  .state('home.list1', {
      url: '/list1',
      templateUrl: 'templates/list.html',
      controller: 'ListCtrl',
      cache:false
    })
    
  .state('home.add', {
    url: '/add',
    views: {
      'add': {
        templateUrl: 'templates/add.html',
        controller: 'AddCtrl'
      }
    },
    cache:false
  })
  .state('home.image', {
    url: '/image',
    views: {
      'image': {
        templateUrl: 'templates/image.html',
        controller: 'ImageCtrl'
      }
    },
    cache:false
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/status');

});
