angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $http, $location) {
      $scope.data = {};
      $scope.submit = function() {
        var link = 'http://csit.kutztown.edu/kuizine/application_files/login.php';
        $http.post(link, {username : $scope.data.username, password : $scope.data.password}).then(function (res) {
            $scope.response = res.data;
            if ($scope.response == 'success') {
              $scope.response = '';
              $location.path('/home');
            }
        });
    }
})

.controller('signupCtrl', function($scope) {

})

.controller('browseCtrl', function($scope) {
    var cards = [];
    for (var i = 1; i <= 10; i++) {
        var card = {
            header: 'Category header ' + i,
            description: 'Description for item ' + i
        };
        cards.push(card);
    }
    $scope.cards = cards;
})

.controller('favoritesCtrl', function($scope) {

})

.controller('homeCtrl', function($scope) {

})

.controller('searchCtrl', function($scope) {

})

;
