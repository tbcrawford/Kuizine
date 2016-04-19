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
.controller('browseCtrl', function(NetworkErrorService, RestaurantDisplayService, $scope, $stateParams) {
    //
    $scope.getCategoriesList = function() {
        RestaurantDisplayService.getCategoriesList().then(function(response) {
            $scope.categoriesList = response;
        });
    };

    //
    $scope.categoryIsSet = function() {
        //
        return RestaurantDisplayService.categoryIsSet();
    }

    //
    $scope.getCategoryId = function() {
        return RestaurantDisplayService.getCategoryId();
    }

    //
    $scope.getRestaurantsList = function(categoryId) {
        RestaurantDisplayService.getRestaurantsList(categoryId).then(function(response) {
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
    $scope.credentials = {username: '', password: ''};

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
.controller('signupCtrl', function(AuthenticationService, NetworkErrorService, $scope) {
    //
    $scope.credentials = {username: '', password: '', reenter: ''};

    //
    $scope.validate = function() {
        //
        $scope.errors = [];

        //
        if ($scope.credentials.username.length < 3 || $scope.credentials.username.length > 20) {
            $scope.errors.push("Username must be between 3 and 20 characters long");
        }
        //
        if (!RegExp("^[a-zA-Z0-9_]+$").test($scope.credentials.username)) {
            $scope.errors.push("Username must only contain alphanumeric characters and underscores");
        }
        //
        if ($scope.credentials.password.length < 4 || $scope.credentials.username.length > 20) {
            $scope.errors.push("Password must be between 4 and 20 characters long");
        }
        //
        if (!RegExp("^[a-zA-Z0-9_]+$").test($scope.credentials.password)) {
            $scope.errors.push("Password must only contain alphanumeric characters and underscores");
        }
        //
        if ($scope.credentials.password != $scope.credentials.reenter) {
            $scope.errors.push("Passwords do not match");
        }
        //
        if ($scope.errors.length > 0) {

        }
        else {
            alert("Valid!");
        }
    }

    //
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };
});
