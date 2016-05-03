angular.module('app.controllers', [])


/**
 * Home controller
 */
.controller('homeCtrl', function($scope) {})


/**
 * Nav Menu Controller (Side-Menu)
 */
.controller('navmenuCtrl', function(AuthenticationService, $ionicSideMenuDelegate, $scope) {
    // Get the current login status of the user
    $scope.getLoginStatus = function() {
        return AuthenticationService.getLoginStatus();
    };

    // Get the logged in user's username
    $scope.getUsername = function() {
        return AuthenticationService.getUsername();
    };

    // Log the current user out of the app and toggle the side menu
    $scope.logout = function() {
        $ionicSideMenuDelegate.toggleLeft();
        AuthenticationService.logout();
    };
})


/**
 * Search Controller
 */
.controller('searchCtrl', function($ionicFilterBar, NetworkErrorService, RestaurantDisplayService, $scope) {
    // Checks to make sure there is a network connection
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    // Gets all restaurants and puts them into a list
    // 12 is denoted as the 'All' category
    $scope.getRestaurantsList = function() {
        RestaurantDisplayService.getRestaurantsList(12).then(function(response) {
            $scope.restaurantsList = response;
        });
    };

    // Filters the restaurants based on a user query
    $scope.showFilterBar = function() {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.restaurantsList,
            update: function(filteredItems) {
                $scope.restaurantsList = filteredItems;
            },
            filterProperties: 'restaurantTags'
        });
    };
})


/**
 * Browse Controller
 */
.controller('browseCtrl', function(NetworkErrorService, RestaurantDisplayService, $scope) {
    // Checks to make sure there is a network connection
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    // Gets a list of all of the categories
    $scope.getCategoriesList = function() {
        RestaurantDisplayService.getCategoriesList().then(function(response) {
            $scope.categoriesList = response;
        });
    };

    // Gets a list of restaurants based on the categoryId
    // categoryId refers to a category number that relates to the category name
    $scope.getRestaurantsList = function(categoryId) {
        RestaurantDisplayService.getRestaurantsList(categoryId).then(function(response) {
            $scope.restaurantsList = response;
        });
    };
})


/**
 * Category Controller
 */
.controller('categoryCtrl', function(NetworkErrorService, RestaurantDisplayService, $scope) {
    // Checks to make sure there is a network connection
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    // Gets the current categories id
    $scope.getCategoryId = function() {
        return RestaurantDisplayService.getCategoryId();
    };

    // Gets the current categories name
    $scope.getCategoryName = function() {
        return RestaurantDisplayService.getCategoryName();
    };

    // Gets a list of restaurants based on the categoryId
    // categoryId refers to a category number that relates to the category name
    $scope.getRestaurantsList = function(categoryId) {
        RestaurantDisplayService.getRestaurantsList(categoryId).then(function(response) {
            $scope.restaurantsList = response;
        });
    };
})


/**
 * Profile Controller
 */
.controller('profileCtrl', function(AuthenticationService, NetworkErrorService, RestaurantDisplayService, $scope, $state) {
    // A list of days of the week
    $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Adds or removes a favorite restaurant based on the current state of whether
    // or not the restaurant is currently favorited
    $scope.addRemoveFavorite = function(restaurantId) {
        if ($scope.profile.favorited) {
            $scope.profile.favorited = !$scope.profile.favorited;
            RestaurantDisplayService.removeFavorite(AuthenticationService.getUserId(), restaurantId).then(function(response) {});
        } else {
            $scope.profile.favorited = !$scope.profile.favorited;
            RestaurantDisplayService.addFavorite(AuthenticationService.getUserId(), restaurantId).then(function(response) {});
        }
    };

    // Checks to make sure there is a network connection
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    // Gets the current day of the week
    $scope.getDay = function() {
        return RestaurantDisplayService.getDay();
    };

    // Get the current login status of the user
    $scope.getLoginStatus = function() {
        return AuthenticationService.getLoginStatus();
    };

    // Gets the current restaurants profile data
    // The user id is passed to the getRestaurantProfile
    $scope.getRestaurantProfile = function() {
        RestaurantDisplayService.getRestaurantProfile(AuthenticationService.getUserId()).then(function(response) {
            $scope.profile = response;
        });
    };

    // Open the restaurant menu link in the system browser
    $scope.openMenuLink = function() {
        window.open($scope.profile.restaurantMenuLink, '_system', 'location=yes');
    };

    // Open the restaurant website link in the system browser
    $scope.openWebsiteLink = function() {
        window.open($scope.profile.restaurantWebsite, '_system', 'location=yes');
    };

    // Open the system maps app with the restaurant address preloaded into the app
    $scope.openExternalMaps = function() {
        if (ionic.Platform.isAndroid()) {
            window.open("http://maps.google.com/maps?daddr=" + $scope.profile.restaurantAddress, '_system');
        } else {
            window.open("maps://maps.apple.com/?daddr=" + $scope.profile.restaurantAddress, '_system');
        }
    };
})


/**
 * Favorites Controller
 */
.controller('favoritesCtrl', function(AuthenticationService, NetworkErrorService, RestaurantDisplayService, $scope) {
    // Checks to make sure there is a network connection
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    // Get the list of favorite restaurants based on the user id
    $scope.getFavoritesList = function() {
        RestaurantDisplayService.getFavoritesList(AuthenticationService.getUserId()).then(function(response) {
            $scope.favoritesList = response;
        });
    };
})


/**
 * Login Controller
 */
.controller('loginCtrl', function(AuthenticationService, NetworkErrorService, $scope) {
    // Initialize the credentials as empty
    $scope.credentials = {
        username: '',
        password: ''
    };

    // Checks to make sure there is a network connection
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    // Logs the user into the application
    $scope.login = function() {
        AuthenticationService.login($scope.credentials.username, $scope.credentials.password).then(function(response) {});
    };
})


/**
 * Signup Controller
 */
.controller('signupCtrl', function(AuthenticationService, $http, NetworkErrorService, $scope, $state, $q) {
    // Initializes the credentials as empty
    $scope.credentials = {
        username: '',
        password: '',
        reenter: ''
    };

    // Initialize the error message to empty string
    $scope.error = "";

    // Checks to make sure there is a network connection
    $scope.checkNetwork = function() {
        NetworkErrorService.checkNetwork();
    };

    // Validate input on the client side
    $scope.validateClientSide = function() {
        if ($scope.credentials.username.length < 3 || $scope.credentials.username.length > 20) {
            $scope.error = "Username must be between 3 and 20 characters long";
        } else if (!RegExp("^[a-zA-Z0-9_]+$").test($scope.credentials.username)) {
            $scope.error = "Username must only contain alphanumeric characters or underscores";
        } else if ($scope.credentials.password.length < 4 || $scope.credentials.password.length > 20) {
            $scope.error = "Password must be between 4 and 20 characters long";
        } else if (!RegExp("^[a-zA-Z0-9_]+$").test($scope.credentials.password)) {
            $scope.error = "Password must only contain alphanumeric characters or underscores";
        } else if ($scope.credentials.password != $scope.credentials.reenter) {
            $scope.error = "Passwords do not match";
        } else {
            $scope.validateServerSide();
        }
    };

    // If the input is legal, check to make sure an account does not already exist.
    // If an account exists, show the error message, else create a new account
    // and redirect home
    $scope.validateServerSide = function() {
        // 
        var deferred = $q.defer();

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/signup.php', {
                username: $scope.credentials.username,
                password: $scope.credentials.password
            })
            .then(function(response) {
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
    };
});
