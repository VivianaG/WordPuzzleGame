'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wordPuzzleGameApp
 */
 angular.module('wordPuzzleGameApp')
 .controller('LoginCtrl', ["$rootScope", "$location","DynamicDataService", function ($rootScope, $location, DynamicDataService) {
    DynamicDataService.connectToDatabase();

    this.invalidUsername = false;
    this.connectUser = function(username) {
        //make sure not to submit an empty username
        if(username) {
            //connect existing user or create new user
            DynamicDataService.getUser(username).then(
                function (user) {
                    //make the username visible on the rootScope
                    $rootScope.user = user;
                    //after connect, redirect page to the main page,
                    //to play the game
                    $location.path("wordpuzzle");
                },
                function (err) {
                    console.log(err);
                }
                );
        } else {
            this.invalidUsername = true;
        }
};



}]);
