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

//
.controller('browseCtrl', function($scope, RestaurantDisplayService) {
    $scope.getRestaurantsList = function() {
        RestaurantDisplayService.getRestaurantsList().then(function(response) {
            $scope.restaurantsList = response;
        });
    }
})

//
.controller('profileCtrl', function($scope, RestaurantDisplayService) {
    $scope.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    $scope.getRestaurantProfile = function() {
        RestaurantDisplayService.getRestaurantProfile().then(function(response) {
            $scope.profile = response;
        });
    }
    $scope.getDay = function() {
        return RestaurantDisplayService.getDay();
    }
    $scope.openMenuLink = function() {
        window.open($scope.profile.restaurantMenuLink, '_system', 'location=yes');
    }
    $scope.openWebsiteLink = function() {
        window.open($scope.profile.restaurantWebsite, '_system', 'location=yes');
    }
})

//
.controller('favoritesCtrl', function($scope, AuthenticationService) {
})

//
.controller('loginCtrl', function($scope, $state, AuthenticationService) {
    $scope.credentials = {};
    $scope.login = function() {
        AuthenticationService.login($scope.credentials.username, $scope.credentials.password).then(function(response) {
        });
    }
})

//
.controller('signupCtrl', function($scope) {
})
