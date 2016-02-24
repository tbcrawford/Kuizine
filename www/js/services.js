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
.factory('RestaurantDisplayService', ['$http', function($http) {

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

  //
  return restaurantDisplayService;
}])
