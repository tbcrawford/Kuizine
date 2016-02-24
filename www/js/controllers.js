angular.module('app.controllers', [])


.controller('homeCtrl', function($scope) {
})

.controller('searchCtrl', function($scope) {

})

.controller('browseCtrl', function($scope, RestaurantDisplayService) {
  $scope.cards = RestaurantDisplayService.browseByName();
})

.controller('profileCtrl', function($scope, $stateParams, RestaurantDisplayService) {
  RestaurantDisplayService.getRestaurantInfo().then(function(response) {
    $scope.profile = response;
  });
})

.controller('favoritesCtrl', function($scope) {

})

.controller('loginCtrl', function($scope, AuthenticationService) {
  $scope.credentials = {};
  $scope.login = function() {
    AuthenticationService.login($scope.credentials.username, $scope.credentials.password);
  }
  $scope.getLoginStatus = function() {
    return AuthenticationService.getLoginStatus();
  }
})

.controller('signupCtrl', function($scope) {

})
