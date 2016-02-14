angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // $ionicFilterBarConfigProvider.theme('calm');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('kuizine.login', {
      url: '/login',
      views: {
        'side-menu': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })




    .state('kuizine', {
      url: '/menu',
      abstract:true,
      templateUrl: 'templates/nav-menu.html'
    })





    .state('kuizine.signup', {
      url: '/signup',
      views: {
        'side-menu': {
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
        }
      }
    })




    .state('kuizine.browse', {
      url: '/browse',
      views: {
        'side-menu': {
          templateUrl: 'templates/browse.html',
          controller: 'browseCtrl'
        }
      }
    })





    .state('kuizine.favorites', {
      url: '/favorites',
      views: {
        'side-menu': {
          templateUrl: 'templates/favorites.html',
          controller: 'favoritesCtrl'
        }
      }
    })





    .state('kuizine.home', {
      url: '/home',
      views: {
        'side-menu': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })





    .state('kuizine.search', {
      url: '/search',
      views: {
        'side-menu': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/home');

});
