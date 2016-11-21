'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wordPuzzleGameApp
 */
angular.module('wordPuzzleGameApp')
  .controller('MainCtrl', ["$scope", function ($scope) {
    $scope.mainCtrlMessage = "Message from MainCtrl";
  }]);
