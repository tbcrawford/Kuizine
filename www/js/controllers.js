angular.module('app.controllers', [])

//
.controller('homeCtrl', function($scope, AuthenticationService) {
})

//
.controller('navmenuCtrl', function($scope, $ionicSideMenuDelegate, AuthenticationService) {
    //
    $scope.getLoginStatus = function() {
        return AuthenticationService.getLoginStatus();
    };

    //
    $scope.getUsername = function() {
        return AuthenticationService.getUsername();
    };

    //
    $scope.logout = function() {
        $ionicSideMenuDelegate.toggleLeft();
        AuthenticationService.logout();
    };
})

//
.controller('searchCtrl', function($scope, $ionicFilterBar, $ionicPopup, $state, RestaurantDisplayService) {
    $scope.items = [];

    $scope.showFilterBar = function() {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.restaurantsList,
            update: function(filteredItems) {
                $scope.restaurantsList = filteredItems;
            },
            filteredProperties: 'restaurantName'
        });
    };

    //
    $scope.getRestaurantsList = function() {
        RestaurantDisplayService.getRestaurantsList().then(function(response) {
            $scope.restaurantsList = response;
        });
    };

    //
    $scope.checkNetwork = function() {
        if(window.Connection) {
            if(navigator.connection.type == Connection.NONE) {
                $ionicPopup.alert({
                    title: 'No Network Connection',
                    content: 'Please connect to a network to use this functionality.'
                })
                .then(function(result) {
                    $state.go('kuizine.home');
                });
            }
        }
    };
})

//
.controller('browseCtrl', function($scope, $ionicPopup, $state, RestaurantDisplayService) {
    //
    $scope.getRestaurantsList = function() {
        RestaurantDisplayService.getRestaurantsList().then(function(response) {
            $scope.restaurantsList = response;
        });
    };

    //
    $scope.checkNetwork = function() {
        if(window.Connection) {
            if(navigator.connection.type == Connection.NONE) {
                $ionicPopup.alert({
                    title: 'No Network Connection',
                    content: 'Please connect to a network to use this functionality.'
                })
                .then(function(result) {
                    $state.go('kuizine.home');
                });
            }
        }
    };
})

//
.controller('profileCtrl', function($scope, $ionicPopup, $state, AuthenticationService, RestaurantDisplayService) {
    //
    $scope.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    //
    $scope.getRestaurantProfile = function() {
        RestaurantDisplayService.getRestaurantProfile(AuthenticationService.getUserId()).then(function(response) {
            $scope.profile = response;
        });
    };

    //
    $scope.getDay = function() {
        return RestaurantDisplayService.getDay();
    };

    //
    $scope.openMenuLink = function() {
        window.open($scope.profile.restaurantMenuLink, '_system', 'location=yes');
    };

    //
    $scope.openWebsiteLink = function() {
        window.open($scope.profile.restaurantWebsite, '_system', 'location=yes');
    };

    //
    $scope.checkNetwork = function() {
        if(window.Connection) {
            if(navigator.connection.type == Connection.NONE) {
                $ionicPopup.alert({
                    title: 'No Network Connection',
                    content: 'Please connect to a network to use this functionality.'
                })
                .then(function(result) {
                    $state.go('kuizine.home');
                });
            }
        }
    };

    //
    $scope.getLoginStatus = function() {
        return AuthenticationService.getLoginStatus();
    };

    //
    $scope.addFavorite = function(restaurantId) {
        //
        $scope.profile.favorited = "true";
        $state.go('kuizine.profile');
        RestaurantDisplayService.addFavorite(AuthenticationService.getUserId(), restaurantId).then(function(response) {
        });
    };

    //
    $scope.removeFavorite = function(restaurantId) {
        //
        $scope.profile.favorited = "false";
        $state.go('kuizine.profile');
        RestaurantDisplayService.removeFavorite(AuthenticationService.getUserId(), restaurantId).then(function(response) {
        });
    };

})

//
.controller('favoritesCtrl', function($scope, $ionicPopup, AuthenticationService, RestaurantDisplayService) {
    //
    $scope.getFavoritesList = function() {
        //
        RestaurantDisplayService.getFavoritesList(AuthenticationService.getUserId()).then(function(response) {
            $scope.favoritesList = response;
        });
    }

    //
    $scope.checkNetwork = function() {
        if(window.Connection) {
            if(navigator.connection.type == Connection.NONE) {
                $ionicPopup.alert({
                    title: 'No Network Connection',
                    content: 'Please connect to a network to use this functionality.'
                })
                .then(function(result) {
                });
            }
        }
    };
})

//
.controller('loginCtrl', function($scope, $ionicPopup, AuthenticationService) {
    //
    $scope.credentials = {};

    //
    $scope.login = function() {
        AuthenticationService.login($scope.credentials.username, $scope.credentials.password).then(function(response) {
        });
    };

    //
    $scope.checkNetwork = function() {
        if(window.Connection) {
            if(navigator.connection.type == Connection.NONE) {
                $ionicPopup.alert({
                    title: 'No Network Connection',
                    content: 'Please connect to a network to use this functionality.'
                })
                .then(function(result) {
                });
            }
        }
    };
})

//
.controller('signupCtrl', function($scope) {
});
