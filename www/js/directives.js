angular.module('app.directives', [])

//
.directive('map', function(RestaurantDisplayService) {
    return {
        restrict: 'E',
        scope: {
            address: '=',
            onCreate: '&'
        },
        link: function($scope, $element, $attrs) {
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
});
