angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'jett.ionic.filter.bar'])

//
.run(function($ionicPlatform) {
    //
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        //
        if(window.StatusBar) {
            if (cordova.platfromId == 'android') {
                StatusBar.backgroundColorByHexString("#477d9f");
            } else {
                StatusBar.styleLightContent();
            }
            StatusBar.overlaysWebView(true);
        }
    });

    //
    $ionicPlatform.registerBackButtonAction(
        function () {
            console.log("");
        }, 100
    );
});
