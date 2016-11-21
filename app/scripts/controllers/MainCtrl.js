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
	var words = [];
	var remainedWords = [];
	var self = this;

	this.currentWord = {};
	this.username = $rootScope.username;
	this.gameStarted = false;

	if(!$rootScope.username) {
		//go to login page
		$location.path("/");
	}

	getHighScores();
	getWords();

	this.startGame = function() {
		getWords();
		this.gameStarted = true;

	};

	this.endGame = function() {
		this.gameStarted = false;
	}

	this.onGetNextWord = function() {
		getNextWord();
	}

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

	function getWords() {
		DynamicDataService.getWords().then(
			function(res) {
				words = res;
				remainedWords = res;
				if(words && words.length > 0) {
					self.currentWord = words[0];
					remainedWords.shift();
				}
			},
			function(err) {
				console.log(err);
			}
		);
	}

	function getNextWord() {
		//make sure we have another word in queue
		if(remainedWords  && remainedWords.length > 0) {
			self.currentWord = remainedWords[0];
			remainedWords.shift();
		} else {
			getWords();
		}
	}

 }]);
