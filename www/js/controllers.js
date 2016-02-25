angular.module('app.controllers', [])

//
.controller('homeCtrl', function($scope, AuthenticationService) {
})

//
.controller('navmenuCtrl', function($scope, AuthenticationService) {
  $scope.getLoginStatus = function() {
    return AuthenticationService.getLoginStatus();
  }
  $scope.getUsername = function() {
    return AuthenticationService.getUsername();
  }
  $scope.logout = function() {
    return AuthenticationService.logout();
  }
})

//
.controller('searchCtrl', function($scope) {
})

.controller('browseCtrl', function($scope, RestaurantDisplayService) {
  $scope.cards = RestaurantDisplayService.browseByName();
})

//
.controller('profileCtrl', function($scope, $stateParams, RestaurantDisplayService) {
  RestaurantDisplayService.getRestaurantInfo().then(function(response) {
    $scope.profile = response;
  });
})

//
.controller('favoritesCtrl', function($scope, AuthenticationService) {
})

//
.controller('loginCtrl', function($scope, AuthenticationService) {
  $scope.credentials = {};
  $scope.login = function() {
    AuthenticationService.login($scope.credentials.username, $scope.credentials.password);
  }
  $scope.getLoginStatus = function() {
    return AuthenticationService.getLoginStatus();
  }
  $scope.getUsername = function() {
    return AuthenticationService.getUsername();
  }
  $scope.logout = function() {
    return AuthenticationService.logout();
  }
})

//
.controller('signupCtrl', function($scope) {
})
