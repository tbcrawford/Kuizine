angular.module('app.routes', ['ionic', 'jett.ionic.filter.bar'])

.config(function($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('kuizine', {
      url: '/menu',
      abstract:true,
      templateUrl: 'templates/nav-menu.html',
      controller: 'navmenuCtrl'
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

    .state('kuizine.browse', {
      url: '/browse',
      views: {
        'side-menu': {
          templateUrl: 'templates/browse.html',
          controller: 'browseCtrl'
        }
      }
    })

    .state('kuizine.profile', {
      url: '/profile?restaurantId',
      views: {
        'side-menu': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
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

    .state('kuizine.login', {
      url: '/login',
      views: {
        'side-menu': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })

    .state('kuizine.signup', {
      url: '/signup',
      views: {
        'side-menu': {
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/home');
  $ionicFilterBarConfigProvider.theme('assertive');

});
