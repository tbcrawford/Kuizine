angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('kuizine.login', {
      url: '/login',
      views: {
        'side-menu21': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })
        
      
    
      
    .state('kuizine', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/kuizine.html'
    })
      
    
      
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('kuizine.browse', {
      url: '/browse',
      views: {
        'side-menu21': {
          templateUrl: 'templates/browse.html',
          controller: 'browseCtrl'
        }
      }
    })
        
      
    
      
        
    .state('kuizine.favorites', {
      url: '/favorites',
      views: {
        'side-menu21': {
          templateUrl: 'templates/favorites.html',
          controller: 'favoritesCtrl'
        }
      }
    })
        
      
    
      
        
    .state('kuizine.home', {
      url: '/home',
      views: {
        'side-menu21': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
        
      
    
      
        
    .state('kuizine.search', {
      url: '/search',
      views: {
        'side-menu21': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/side-menu21/login');

});