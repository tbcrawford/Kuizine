angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'jett.ionic.filter.bar', 'ngCordova'])

// Instantiate the application
.run(function($cordovaStatusbar, $ionicHistory, $ionicPlatform, $state, $stateParams) {
    // When ionic is ready, run this function
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        // Adds status bar color to Android
        if (window.StatusBar) {
            if (ionic.Platform.isAndroid()) {
                StatusBar.backgroundColorByHexString("#355D76");
            } else {
                StatusBar.styleLightContent();
            }
        }
    });

    // Override Android back button functionality for the following views
    $ionicPlatform.registerBackButtonAction(function() {
        // If on home view exit; if on category, profile, or signup, go back;
        // else, go to home view
        if ($state.current.name == "kuizine.home") {
            ionic.Platform.exitApp();
        } else if ($state.current.name == "kuizine.category" ||
                   $state.current.name == "kuizine.profile"  ||
                   $state.current.name == "kuizine.signup") {
            $ionicHistory.goBack();
        } else {
            $state.go("kuizine.home");
        }
    }, 100);
});
