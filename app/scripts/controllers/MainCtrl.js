'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wordPuzzleGameApp
 */
 angular.module('wordPuzzleGameApp')
 .controller('MainCtrl', ["$rootScope", "$scope", "DynamicDataService", function ($rootScope, $scope, DynamicDataService) {
	this.username = $rootScope.username;
	this.gameStarted = false;

	getHighScores();
	this.startGame = function() {

	};
	function getHighScores() {
		DynamicDataService.getHighscore().then(
			function(res) {
				$scope.highScore = res;
			},
			function(err) {
				console.log(err);
			}
		);
	}

 }]);
