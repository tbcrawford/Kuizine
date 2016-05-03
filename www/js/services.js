angular.module('app.services', [])

/**
 * Authentication Service factory
 */
.factory('AuthenticationService', ['$http', '$q', '$state', '$window', function($http, $q, $state, $window) {
    // Initialize authenticationService variable
    var authenticationService = {};

    // Validate and log in a user
    authenticationService.login = function(user, pass) {
        // Defer variable instantiated for use in asynchronous functionality
        var deferred = $q.defer();

        // Communicate with server via http post
        // Pass username and password to server and get a response
        $http.post('http://csit.kutztown.edu/kuizine/application_files/login.php', {
                username: user,
                password: pass
            })
            .then(function(response) {
                // If response indicates success, log the user in, redirect home
                if (response.data.message == "AUTHORIZATION-SUCCESS") {
                    $window.localStorage.setItem('loggedIn', true);
                    $window.localStorage.setItem('username', user);
                    $window.localStorage.setItem('userId', response.data.userId);
                    $state.go('kuizine.home');
                }
                // Otherwise set a variable that triggers an error message
                else {
                    $window.localStorage.setItem('loggedIn', false);
                }
            });

        // Resolve and return the deferred promise
        deferred.resolve();
        return deferred.promise;
    };

    // Return the login status of a user
    authenticationService.getLoginStatus = function() {
        if ($window.localStorage.getItem('loggedIn') == 'true') {
            return true;
        } else if ($window.localStorage.getItem('loggedIn') == 'false') {
            return false;
        } else {
            return undefined;
        }
    };

    // Return the username of a user
    authenticationService.getUsername = function() {
        return $window.localStorage.getItem('username');
    };

    // Return the user id of a user
    authenticationService.getUserId = function() {
        return $window.localStorage.getItem('userId');
    };

    // Log a user out, redirect home
    authenticationService.logout = function() {
        $window.localStorage.removeItem('loggedIn');
        $window.localStorage.removeItem('username');
        $window.localStorage.removeItem('userId');
        $state.go('kuizine.home');
    };

    // Return the authenticationService variable
    return authenticationService;
}])


/**
 * Restaurant Display Service factory
 */
.factory('RestaurantDisplayService', ['$http', '$q', '$stateParams', function($http, $q, $stateParams) {
    // Initialize restaurantDisplayService variable
    var restaurantDisplayService = {};

    // Get the full list of restaurant categories
    restaurantDisplayService.getCategoriesList = function() {
        // Defer variable instantiated for use in asynchronous functionality
        // Instantiate array of categories
        var deferred = $q.defer();
        var categoriesList = [];

        // Communicate with the server via http post
        // Populate categoriesList with categories retrieved from server/database
        $http.post('http://csit.kutztown.edu/kuizine/application_files/get_categories_list.php')
        .then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                categoriesList.push(response.data[i]);
            }

            // Resolve categoriesList and return the value
            deferred.resolve(categoriesList);
            return categoriesList;
        });

        // Return the deferred promise
        return deferred.promise;
    };

    // Return the categoryId retrieved using stateParams / URL parameters
    restaurantDisplayService.getCategoryId = function() {
        return $stateParams.categoryId;
    };

    // Return the categoryName retrieved using stateParams / URL parameters
    restaurantDisplayService.getCategoryName = function() {
        return $stateParams.categoryName;
    };

    // Return the list of restaurants for a given categoryId
    restaurantDisplayService.getRestaurantsList = function(categoryId) {
        // Defer variable instantiated for use in asynchronous functionality
        // Instantiate array of restaurants
        var deferred = $q.defer();
        var restaurantsList = [];

        // Set categoryId as the string 'undefined' if it is not a positive integer
        if (!(categoryId > 0)) {
            categoryId = "undefined";
        }

        // Communicate with the server via http post
        // Pass day of week and category id to retrieve relevant info for each
        // restaurant in the category
        $http.post('http://csit.kutztown.edu/kuizine/application_files/get_restaurants_list.php', {
                dayOfWeek: restaurantDisplayService.getDay(),
                categoryId: categoryId
            })
            .then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    restaurantsList.push(response.data[i]);
                }

                // Resolve the restaurantsList, and return it
                deferred.resolve(restaurantsList);
                return restaurantsList;
            });

        // Return the deferred promise
        return deferred.promise;
    };

    // Return the list of favorited restaurants for a given user
    restaurantDisplayService.getFavoritesList = function(userId) {
        // Defer variable instantiated for use in asynchronous functionality
        // Instantiate array of favorites
        var deferred = $q.defer();
        var favoritesList = [];

        // Communicate with the server via http post
        // Pass day of week and user id to retrieve relevant info for each
        // restaurant that is favorited
        $http.post('http://csit.kutztown.edu/kuizine/application_files/get_favorites_list.php', {
                userId: userId,
                dayOfWeek: restaurantDisplayService.getDay()
            })
            .then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    favoritesList.push(response.data[i]);
                }

                // Resolve favoritesList, and return it
                deferred.resolve(favoritesList);
                return favoritesList;
            });

        // Return deferred promise
        return deferred.promise;
    };

    // Add a restaurant to favorites for a given user
    restaurantDisplayService.addFavorite = function(userId, restaurantId) {
        // Defer variable instantiated for use in asynchronous functionality
        var deferred = $q.defer();

        // Communicate with the server via http post
        // Pass user id and restaurant id to add as a favorite for user
        $http.post('http://csit.kutztown.edu/kuizine/application_files/add_favorite.php', {
                userId: userId,
                restaurantId: restaurantId
            })
            .then(function(response) {});

        // Resolve and return the deferred promise
        deferred.resolve();
        return deferred.promise;
    };

    // Remove a restaurant from favorites for a given user
    restaurantDisplayService.removeFavorite = function(userId, restaurantId) {
        // Defer variable instantiated for use in asynchronous functionality
        var deferred = $q.defer();

        // Communicate with the server via http post
        // Pass user id and restaurant id to remove a favorite for user
        $http.post('http://csit.kutztown.edu/kuizine/application_files/remove_favorite.php', {
                userId: userId,
                restaurantId: restaurantId
            })
            .then(function(response) {});

        // Resolve and return the deferred promise
        deferred.resolve();
        return deferred.promise;
    };

    // Return a restaurant's profile
    restaurantDisplayService.getRestaurantProfile = function(userId) {
        // Defer variable instantiated for use in asynchronous functionality
        var deferred = $q.defer();

        // Set userId as the string 'undefined' if it is not a positive integer
        if (!(userId > 0)) {
            userId = "undefined";
        }

        // Communicate with the server via http post
        // Pass restaurant id and user id to get a restaurant's profile
        // User id is used to determine whether or not restaurant is favorited by the user
        $http.post('http://csit.kutztown.edu/kuizine/application_files/get_restaurant_profile.php', {
                restaurantId: $stateParams.restaurantId,
                userId: userId
            })
            .then(function(response) {
                // Set the profile values
                var profile = response.data;

                // If the restaurant has been favorited by the user, set
                // the favorited attribute true, otherwise false
                if (profile.favorited == "true") {
                    profile.favorited = true;
                } else {
                    profile.favorited = false;
                }

                // Resolve and return profile
                deferred.resolve(profile);
                return profile;
            });

        // Return deferred promise
        return deferred.promise;
    };

    // Return the current day in numeric form (0-6)
    restaurantDisplayService.getDay = function() {
        var date = new Date();
        return date.getDay();
    };

    // Return restaurantDisplayService variable
    return restaurantDisplayService;
}])


/**
 * Network Error Service factory
 */
.factory('NetworkErrorService', ['$ionicPopup', '$state', function($ionicPopup, $state) {
    // Initialize networkErrorService variable
    var networkErrorService = {};

    // Check to make sure that a network connection is available
    // Display an error message and redirect if no connection is found
    networkErrorService.checkNetwork = function() {
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
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

    // Return networkErrorService variable
    return networkErrorService;
}]);
