angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'jett.ionic.filter.bar', 'ngCordova'])

//
.run(function($cordovaStatusbar, $ionicHistory, $ionicPlatform, $state, $stateParams) {
    //
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        // Hopeful fix for status bar color on Android
        if (window.StatusBar) {
            if (ionic.Platform.isAndroid()) {
                StatusBar.backgroundColorByHexString("#355d76");
            } else {
                StatusBar.styleLightContent();
            }
        }
    });

    //
    $ionicPlatform.registerBackButtonAction(
        function () {
            //
            if ($state.current.name == "kuizine.home") {
                ionic.Platform.exitApp();
            }
            //
            else if ($state.current.name == "kuizine.category") {
                $ionicHistory.goBack();
            }
            //
            else if ($state.current.name == "kuizine.profile") {
                $ionicHistory.goBack();
            }
            //
            else if ($state.current.name == "kuizine.signup") {
                $ionicHistory.goBack();
            }
            //
            else {
                $state.go("kuizine.home");
            }
        }, 100
    );
});
