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
.controller('searchCtrl', function($ionicFilterBar, NetworkErrorService, RestaurantDisplayService, $scope) {
    //
    $scope.items = [];

    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    //
    $scope.getRestaurantsList = function() {
        RestaurantDisplayService.getRestaurantsList(12).then(function(response) {
            $scope.restaurantsList = response;
        });
    };

    //
    $scope.showFilterBar = function() {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.restaurantsList,
            update: function(filteredItems) {
                $scope.restaurantsList = filteredItems;
            },
            filteredProperties: 'restaurantName'
        });
    };
})

//
.controller('browseCtrl', function(NetworkErrorService, RestaurantDisplayService, $scope) {
    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    //
    $scope.getCategoriesList = function() {
        RestaurantDisplayService.getCategoriesList().then(function(response) {
            $scope.categoriesList = response;
        });
    };

    //
    $scope.getRestaurantsList = function(categoryId) {
        RestaurantDisplayService.getRestaurantsList(categoryId).then(function(response) {
            $scope.restaurantsList = response;
        });
    };
})

//
.controller('categoryCtrl', function(NetworkErrorService, RestaurantDisplayService, $scope) {
    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    //
    $scope.getCategoryId = function() {
        return RestaurantDisplayService.getCategoryId();
    }

    //
    $scope.getCategoryName = function() {
        return RestaurantDisplayService.getCategoryName();
    }

    //
    $scope.getRestaurantsList = function(categoryId) {
        RestaurantDisplayService.getRestaurantsList(categoryId).then(function(response) {
            $scope.restaurantsList = response;
        });
    };
})


//
.controller('profileCtrl', function(AuthenticationService, NetworkErrorService, RestaurantDisplayService, $scope, $state) {
    //
    $scope.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    //
    $scope.addRemoveFavorite = function(restaurantId) {
        if ($scope.profile.favorited) {
            $scope.profile.favorited = !$scope.profile.favorited;
            RestaurantDisplayService.removeFavorite(AuthenticationService.getUserId(), restaurantId).then(function(response) {
            });
        } else {
            $scope.profile.favorited = !$scope.profile.favorited;
            RestaurantDisplayService.addFavorite(AuthenticationService.getUserId(), restaurantId).then(function(response) {
            });
        }
    };

    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    //
    $scope.getDay = function() {
        return RestaurantDisplayService.getDay();
    };

    //
    $scope.getLoginStatus = function() {
        return AuthenticationService.getLoginStatus();
    };

    //
    $scope.getRestaurantProfile = function() {
        RestaurantDisplayService.getRestaurantProfile(AuthenticationService.getUserId()).then(function(response) {
            $scope.profile = response;
        });
    };

    //
    $scope.openMenuLink = function() {
        window.open($scope.profile.restaurantMenuLink, '_system', 'location=yes');
    };

    //
    $scope.openWebsiteLink = function() {
        window.open($scope.profile.restaurantWebsite, '_system', 'location=yes');
    };
})

//
.controller('favoritesCtrl', function(AuthenticationService, NetworkErrorService, RestaurantDisplayService, $scope) {
    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    //
    $scope.getFavoritesList = function() {
        //
        RestaurantDisplayService.getFavoritesList(AuthenticationService.getUserId()).then(function(response) {
            $scope.favoritesList = response;
        });
    };
})

//
.controller('loginCtrl', function(AuthenticationService, NetworkErrorService, $scope) {
    //
    $scope.credentials = {username: '', password: ''};

    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    //
    $scope.login = function() {
        AuthenticationService.login($scope.credentials.username, $scope.credentials.password).then(function(response) {
        });
    };
})

//
.controller('signupCtrl', function(AuthenticationService, $http, NetworkErrorService, $scope, $state, $q) {
    //
    $scope.credentials = {username: '', password: '', reenter: ''};
    $scope.error = "";

    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    //
    $scope.validateClientSide = function() {
        //
        if ($scope.credentials.username.length < 3 || $scope.credentials.username.length > 20) {
            $scope.error = "Username must be between 3 and 20 characters long";
        }
        else if (!RegExp("^[a-zA-Z0-9_]+$").test($scope.credentials.username)) {
            $scope.error = "Username must only contain alphanumeric characters or underscores";
        }
        else if ($scope.credentials.password.length < 4 || $scope.credentials.password.length > 20) {
            $scope.error = "Password must be between 4 and 20 characters long";
        }
        else if (!RegExp("^[a-zA-Z0-9_]+$").test($scope.credentials.password)) {
            $scope.error = "Password must only contain alphanumeric characters or underscores";
        }
        else if ($scope.credentials.password != $scope.credentials.reenter) {
            $scope.error = "Passwords do not match";
        }
        else {
            $scope.validateServerSide();
        }
    }

    $scope.validateServerSide = function() {
        //
        var deferred = $q.defer();

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/signup.php', {username: $scope.credentials.username, password: $scope.credentials.password})
        .then(function (response) {
            //
            if (response.data.message == "SIGNUP-SUCCESS") {
                $state.go('kuizine.home');
            }
            //
            else {
                $scope.error = response.data.message;
            }
        });

        //
        deferred.resolve();
        return deferred.promise;
    }
});
