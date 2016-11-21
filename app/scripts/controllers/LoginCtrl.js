'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wordPuzzleGameApp
 */
 angular.module('wordPuzzleGameApp')
 .controller('LoginCtrl', ["$scope", "$location","DynamicDataService", function ($scope, $location, DynamicDataService) {
    DynamicDataService.connectToDatabase();

    this.connectUser = function(username) {
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
    };


  }]);
