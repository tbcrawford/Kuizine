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
.controller('searchCtrl', function($scope, $ionicFilterBar) {
    $scope.items = [];

    for (var i = 1; i < 300; i++) {
        var itemDate = moment().add(i, 'days');
        var item = {
            description: 'Description for item ' + i,
            date: itemDate.toDate()
        };
        $scope.items.push(item);
    }

    $scope.showFilterBar = function() {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.items,
            update: function(filteredItems) {
                $scope.items = filteredItems;
            },
            filteredProperties: 'description'
        });
    };


    $scope.refreshItems = function () {
        if (filterBarInstance) {
            filterBarInstance();
            filterBarInstance = null;
        }

        $timeout(function () {
            getItems();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
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
.controller('profileCtrl', function($scope, $ionicPopup, $state, RestaurantDisplayService) {
    //
    $scope.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    //
    $scope.getRestaurantProfile = function() {
        RestaurantDisplayService.getRestaurantProfile().then(function(response) {
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
