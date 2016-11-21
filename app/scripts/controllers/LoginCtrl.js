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
            //make the username visible on the rootScope
            $rootScope.username = username;
            //connect existing user or create new user
            DynamicDataService.getUser(username).then(
                function (res) {
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
