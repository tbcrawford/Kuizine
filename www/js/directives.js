angular.module('app.directives', [])

/**
 * Map Directive for profile. Loads a map with a marker over top of the restaurant
 * based on the restaurant address. This uses geocoding to accomplish this by
 * getting the latitude and longitude based on the address.
 */
.directive('map', function(RestaurantDisplayService) {
    return {
        restrict: 'E',
        scope: {
            address: '=',
            onCreate: '&'
        },
        link: function($scope, $element, $attrs) {
            // Make a new geocoder, get the latitude and longitude from the
            // restaurant address and place a marker at this latitude and longitude
            function initialize() {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: $scope.address
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var latlng = results[0].geometry.location;
                        map.setCenter(latlng);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: latlng
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
                // Set the map options
                var mapOptions = {
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map($element[0], mapOptions);
                $scope.onCreate({
                    map: map
                });

                // Stop the side bar from dragging when mousedown/tapdown on the map
                google.maps.event.addDomListener($element[0], 'mousedown', function(e) {
                    e.preventDefault();
                    return false;
                });
            }
            if (document.readyState === "complete") {
                initialize();
            } else {
                google.maps.event.addDomListener(window, 'load', initialize);
            }
        }
    };
})

/**
 * Favorite button for profile toggles the state of the icon. When the icon is
 * active (yellow) the restaurant is favorited; when inactive (gray) the
 * restaurant is not favorited.
 */
.directive('buttonFavorite', function() {
    return {
        restrict: 'E',
        scope: true,
        template: '<button class="favorite-icon button button-icon"><i class="fa fa-star" ng-class="{ active: profile.favorited }"></i></button>',
        link: function(scope, elem) {
            elem.bind('click', function() {
                scope.$apply(function() {
                    scope.addRemoveFavorite(scope.profile.restaurantId);
                });
            });
        }
    };
});
