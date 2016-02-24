angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $rootScope, $http, $location) {
      $scope.data = {};
      $scope.submit = function() {
        var link = 'http://csit.kutztown.edu/kuizine/application_files/login.php';
        $http.post(link, {username : $scope.data.username, password : $scope.data.password}).then(function (res) {
            $scope.response = res.data;
            if ($scope.response == 'success') {
              $scope.response = '';
              $rootScope.username = $scope.data.username;
              $location.path('/home');
            }
        });
    }
})

.controller('signupCtrl', function($scope) {

})

.controller('browseCtrl', function($scope, $http) {
    var cards = [];
    var link = 'http://csit.kutztown.edu/kuizine/application_files/browse.php';
    $http.post(link).then(function (res) {
        for (var i = 0; i <= res.data.split.length; i++) {
            var card = {
                header: res.data.split('|')[i],
                description: "Today's hours: ",
            };
            cards.push(card);
        }
        $scope.cards = cards;
    });
})

.controller('favoritesCtrl', function($scope) {

})

.controller('homeCtrl', function($scope) {

})

.controller('searchCtrl', function($scope) {

})

;
