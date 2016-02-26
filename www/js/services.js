angular.module('app.services', [])

//
.factory('AuthenticationService', ['$http', '$q', '$location', function($http, $q, $location) {
  //
  var authenticationService = {};
  var username;
  var loggedIn;

  //
  authenticationService.login = function(user, pass) {
    $http.post('http://csit.kutztown.edu/kuizine/application_files/login.php',
    {username: user, password: pass}).then(function (res) {
      if (res.data == "AUTH-SUCCESS") {
        loggedIn = true;
        username = user;
        $location.path('/home');
      }
      else {
        loggedIn = false;
      }
    });
  }

  //
  authenticationService.getLoginStatus = function() {
    return loggedIn;
  }

  //
  authenticationService.getUsername = function() {
    return username;
  }

  //
  authenticationService.logout = function() {
    loggedIn = undefined;
    username = undefined;
  }

  //
  return authenticationService;
}])


//
.factory('RestaurantDisplayService', ['$http', '$q', '$stateParams', function($http, $q, $stateParams) {
  //
  var restaurantDisplayService = {};

  //
  restaurantDisplayService.getRestaurantsList = function() {
    //
    var restaurantsList = [];

    //
    $http.post('http://csit.kutztown.edu/kuizine/application_files/get_restaurants_list.php').then(function (res) {
      for (var i = 0; i <= res.data.split.length+2; i+=2) {
        var card = {
          header: res.data.split('|')[i],
          restaurantId: res.data.split('|')[i+1],
          hours: "Today's hours: "
        };
        restaurantsList.push(card);
      }
    });

    //
    return restaurantsList;
  }

  //
  restaurantDisplayService.getRestaurantProfile = function() {
    //
    var deferred = $q.defer();
    var profile = {};

    //
    $http.post('http://csit.kutztown.edu/kuizine/application_files/get_restaurant_profile.php',
    {restaurantId:$stateParams.restaurantId}).then(function (response) {
        profile.restaurantName = response.data.split('|')[0];
    		profile.restaurantAddress = response.data.split('|')[1];
    		profile.restaurantPhone = response.data.split('|')[2];
    		profile.restaurantEmail = response.data.split('|')[3];
    		profile.restaurantWebsite = response.data.split('|')[4];
    		profile.restaurantDescription = response.data.split('|')[5];
    		profile.restaurantMenuLink = response.data.split('|')[6];
        profile.restaurantHours = [];
        for (var i = 0; i < 7; i++) {
          profile.restaurantHours.push(response.data.split('|')[i+7]);
        }

        //
        deferred.resolve(profile);
        return profile;
    });

    //
    return deferred.promise;
  }

  //
  restaurantDisplayService.getDay = function() {
    var date = new Date();
    return date.getDay();
  }

  //
  return restaurantDisplayService;
}])
