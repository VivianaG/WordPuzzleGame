'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wordPuzzleGameApp
 */
 angular.module('wordPuzzleGameApp')
 .controller('MainCtrl', ["$rootScope", "$scope", "$location", "DynamicDataService",
 	function ($rootScope, $scope, $location, DynamicDataService) {
	if(!$rootScope.username) {
		//go to login page
		$location.path("/");
	}
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
