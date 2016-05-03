angular.module('app.routes', ['ionic', 'jett.ionic.filter.bar'])


/**
 * Configurator for views
 */
.config(function($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider, $ionicConfigProvider) {
    $stateProvider

    // Kuizine route configuration
    .state('kuizine', {
        url: '/menu',
        abstract: true,
        templateUrl: 'templates/nav-menu.html',
        controller: 'navmenuCtrl'
    })

    // Home page view
    // Displays information about the app and news
    .state('kuizine.home', {
        url: '/home',
        views: {
            'side-menu': {
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            }
        }
    })

    // Search page view
    // Allows a user to search for restaurants by name or metatag
    .state('kuizine.search', {
        url: '/search',
        views: {
            'side-menu': {
                templateUrl: 'templates/search.html',
                controller: 'searchCtrl'
            }
        }
    })

    // Browse page view
    // Displays a list of all categories to browse through
    .state('kuizine.browse', {
        url: '/browse',
        views: {
            'side-menu': {
                templateUrl: 'templates/browse.html',
                controller: 'browseCtrl'
            }
        }
    })

    // Category page view
    // This view is accessed by selecting a specific category from browse and will
    // display a list of each restaurant in the category.
    // categoryId and categoryName URL parameters are for passing these variables
    // from browse
    .state('kuizine.category', {
        url: '/category?categoryId?categoryName',
        views: {
            'side-menu': {
                templateUrl: 'templates/category.html',
                controller: 'categoryCtrl'
            }
        }
    })

    // Profile page views
    // URL parameter restaurantID allows for passing this info from category/search
    // view easily
    .state('kuizine.profile', {
        url: '/profile?restaurantId',
        views: {
            'side-menu': {
                templateUrl: 'templates/profile.html',
                controller: 'profileCtrl'
            }
        }
    })

    // Favorites page view
    // Displays a list of a mobile user's favorite restaurants
    .state('kuizine.favorites', {
        url: '/favorites',
        views: {
            'side-menu': {
                templateUrl: 'templates/favorites.html',
                controller: 'favoritesCtrl'
            }
        }
    })

    // Login page view
    // Allows a user to log in as a mobile user
    .state('kuizine.login', {
        url: '/login',
        views: {
            'side-menu': {
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            }
        }
    })

    // Signup page view
    // Allows a mobile guest to sign up as a mobile user
    .state('kuizine.signup', {
        url: '/signup',
        views: {
            'side-menu': {
                templateUrl: 'templates/signup.html',
                controller: 'signupCtrl'
            }
        }
    });

    // Set default url router provider
    $urlRouterProvider.otherwise('/menu/home');

    // Set ionic filter bar theme
    $ionicFilterBarConfigProvider.theme('calm');

    // Disable swipe back feature on iOS
    $ionicConfigProvider.views.swipeBackEnabled(false);

});
