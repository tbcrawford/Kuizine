angular.module('app.controllers', [])

.controller('loginCtrl', function($scope) {

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
