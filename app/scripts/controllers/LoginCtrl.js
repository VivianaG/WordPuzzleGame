'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wordPuzzleGameApp
 */
 angular.module('wordPuzzleGameApp')
 .controller('LoginCtrl', ["$scope", "DynamicDataService", function ($scope, DynamicDataService) {
    $scope.loginCtrlMessage = "Message from LoginCtrl";

    DynamicDataService.connectToDatabase();
  }]);
