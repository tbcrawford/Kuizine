angular.module('app.services', [])

//
.factory('AuthenticationService', ['$http', '$q', '$state', '$window', function($http, $q, $state, $window) {
    //
    var authenticationService = {};

    //
    authenticationService.login = function(user, pass) {
        //
        var deferred = $q.defer();

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/login.php', {username: user, password: pass})
        .then(function (response) {
            //
            if (response.data.message == "AUTHORIZATION-SUCCESS") {
                $window.localStorage.setItem('loggedIn', true);
                $window.localStorage.setItem('username', user);
                $window.localStorage.setItem('userId', response.data.userId);
                $state.go('kuizine.home');
            }
            //
            else {
                $window.localStorage.setItem('loggedIn', false);
            }
        });

        //
        deferred.resolve();
        return deferred.promise;
    };

    //
    authenticationService.getLoginStatus = function() {
        if ($window.localStorage.getItem('loggedIn') == 'true') {
            return true;
        }
        else if ($window.localStorage.getItem('loggedIn') == 'false') {
            return false;
        }
        else {
            return undefined;
        }
    };

    //
    authenticationService.getUsername = function() {
        return $window.localStorage.getItem('username');
    };

    //
    authenticationService.getUserId = function() {
        return $window.localStorage.getItem('userId');
    };

    //
    authenticationService.logout = function() {
        $window.localStorage.removeItem('loggedIn')
        $window.localStorage.removeItem('username')
        $window.localStorage.removeItem('userId')
        $state.go('kuizine.home');
    };

    //
    return authenticationService;
}])


//
.factory('RestaurantDisplayService', ['$http', '$q', '$stateParams', function($http, $q, $stateParams) {
    //
    var restaurantDisplayService = {};

    //
    restaurantDisplayService.getCategoriesList = function() {
        //
        var deferred = $q.defer();
        var categoriesList = [];

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/get_categories_list.php')
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                categoriesList.push(response.data[i]);
            }

            //
            deferred.resolve(categoriesList);
            return categoriesList;
        });

        //
        return deferred.promise;
    };

    //
    restaurantDisplayService.getCategoryId = function() {
        //
        return $stateParams.categoryId;
    }

    //
    restaurantDisplayService.getCategoryName = function() {
        //
        return $stateParams.categoryName;
    }

    //
    restaurantDisplayService.getRestaurantsList = function(categoryId) {
        //
        var deferred = $q.defer();
        var restaurantsList = [];

        //
        if (!(categoryId > 0)) {
            categoryId = "undefined";
        }

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/get_restaurants_list.php', {dayOfWeek: restaurantDisplayService.getDay(), categoryId: categoryId})
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                restaurantsList.push(response.data[i]);
            }

            //
            deferred.resolve(restaurantsList);
            return restaurantsList;
        });

        //
        return deferred.promise;
    };

    //
    restaurantDisplayService.getFavoritesList = function(userId) {
        //
        var deferred = $q.defer();
        var favoritesList = [];

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/get_favorites_list.php', {userId: userId, dayOfWeek: restaurantDisplayService.getDay()})
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                favoritesList.push(response.data[i]);
            }

            //
            deferred.resolve(favoritesList);
            return favoritesList;
        });

        //
        return deferred.promise;
    };

    //
    restaurantDisplayService.addFavorite = function(userId, restaurantId) {
        //
        var deferred = $q.defer();

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/add_favorite.php', {userId: userId, restaurantId: restaurantId})
        .then(function (response) {
        });

        //
        deferred.resolve(query);
        return deferred.promise;
    };

    //
    restaurantDisplayService.removeFavorite = function(userId, restaurantId) {
        //
        var deferred = $q.defer();

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/remove_favorite.php', {userId: userId, restaurantId: restaurantId})
        .then(function (response) {
        });

        //
        deferred.resolve(query);
        return deferred.promise;
    };

    //
    restaurantDisplayService.getRestaurantProfile = function(userId) {
        //
        var deferred = $q.defer();

        //
        if (!(userId > 0)) {
            userId = "undefined";
        }

        //
        $http.post('http://csit.kutztown.edu/kuizine/application_files/get_restaurant_profile.php', {restaurantId: $stateParams.restaurantId, userId: userId})
        .then(function (response) {
            //
            var profile = response.data;

            //
            deferred.resolve(profile);
            return profile;
        });

        //
        return deferred.promise;
    };

    //
    restaurantDisplayService.getDay = function() {
        var date = new Date();
        return date.getDay();
    };

    //
    return restaurantDisplayService;
}])

//
.factory('NetworkErrorService', ['$ionicPopup', '$state', function($ionicPopup, $state) {
    //
    var networkErrorService = {};

    //
    networkErrorService.checkNetwork = function() {
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
    }

    //
    return networkErrorService;
}]);
