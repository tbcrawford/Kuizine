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
  return authenticationService;
}])





//
.factory('RestaurantDisplayService', ['$http', '$q', '$stateParams', function($http, $q, $stateParams) {

  //
  var restaurantDisplayService = {};

  //
  restaurantDisplayService.browseByName = function() {
    var list = [];
    $http.post('http://csit.kutztown.edu/kuizine/application_files/browse.php').then(function (res) {
      for (var i = 0; i <= res.data.split.length+2; i+=2) {
        var card = {
          header: res.data.split('|')[i],
          restaurantId: res.data.split('|')[i+1],
          description: "Today's hours: ",
        };
        list.push(card);
      }
    });
    return list;
  }

  restaurantDisplayService.getRestaurantInfo = function() {
    var deferred = $q.defer();
    var profile = {};

    // TODO: Do this programmatically, this is obnoxious
    $http.post('http://csit.kutztown.edu/kuizine/application_files/profile.php',
    {restaurantId:$stateParams.restaurantId}).then(function (response) {
        profile.restaurant_name = response.data.split('|')[0];
    		profile.restaurant_address = response.data.split('|')[1];
    		profile.restaurant_phone = response.data.split('|')[2];
    		profile.restaurant_email = response.data.split('|')[3];
    		profile.restaurant_website = response.data.split('|')[4];
    		profile.restaurant_description = response.data.split('|')[5];
    		profile.restaurant_menu_link = response.data.split('|')[6];
    		profile.monday_hours = response.data.split('|')[7];
    	  profile.tuesday_hours = response.data.split('|')[8];
    		profile.wednesday_hours = response.data.split('|')[9];
    		profile.thursday_hours = response.data.split('|')[10];
    		profile.friday_hours = response.data.split('|')[11];
    		profile.saturday_hours = response.data.split('|')[12];
    		profile.sunday_hours = response.data.split('|')[13];
        deferred.resolve(profile);
        return profile;
    });

    return deferred.promise;
  }

  //
  return restaurantDisplayService;
}])
