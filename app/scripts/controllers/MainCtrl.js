'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wordPuzzleGameApp
 */
angular.module('wordPuzzleGameApp')
  .controller('MainCtrl', ["$rootScope", "$scope", function ($rootScope, $scope) {
    var username = $rootScope.username;
  }]);
