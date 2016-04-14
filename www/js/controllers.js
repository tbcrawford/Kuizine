angular.module('app.controllers', [])

//
.controller('homeCtrl', function($scope) {
})

//
.controller('navmenuCtrl', function(AuthenticationService, $ionicSideMenuDelegate, $scope) {
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
.controller('searchCtrl', function($ionicFilterBar, RestaurantDisplayService, NetworkErrorService, $scope) {
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
        NetworkErrorService.checkNetwork();
    };
})

//
.controller('browseCtrl', function(NetworkErrorService, RestaurantDisplayService, $scope) {
    //
    $scope.getRestaurantsList = function() {
        RestaurantDisplayService.getRestaurantsList().then(function(response) {
            $scope.restaurantsList = response;
        });
    };

    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };
})

//
.controller('profileCtrl', function(AuthenticationService, NetworkErrorService, RestaurantDisplayService, $scope, $state) {
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
        NetworkErrorService.checkNetwork();
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

    //
    $scope.showMap = function() {
        if ($scope.profile) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: $scope.profile.restaurantAddress
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latlng = results[0].geometry.location;
                    map.setCenter(latlng);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: latlng
                    });
                } else {
                    // alert('Geocode was not successful for the following reason: ' + status);
                }
            });
            // Set the map options
            var mapOptions = {
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            // Create a new map where id="map"
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        }
    };

})

//
.controller('favoritesCtrl', function(AuthenticationService, NetworkErrorService, RestaurantDisplayService, $scope) {
    //
    $scope.getFavoritesList = function() {
        //
        RestaurantDisplayService.getFavoritesList(AuthenticationService.getUserId()).then(function(response) {
            $scope.favoritesList = response;
        });
    }

    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };
})

//
.controller('loginCtrl', function(AuthenticationService, NetworkErrorService, $scope) {
    //
    $scope.credentials = {};

    //
    $scope.login = function() {
        AuthenticationService.login($scope.credentials.username, $scope.credentials.password).then(function(response) {
        });
    };

    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };
})

//
.controller('signupCtrl', function($scope) {
});
