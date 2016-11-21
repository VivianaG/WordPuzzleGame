'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wordPuzzleGameApp
 */
 angular.module('wordPuzzleGameApp')
 .controller('MainCtrl', ["$rootScope", "$scope", "$location", "$interval", "DynamicDataService",
 	function ($rootScope, $scope, $location, $interval, DynamicDataService) {
	var words = [];
	var remainedWords = [];
	var self = this;

	this.currentWord = {};
	this.user = $rootScope.user;
	this.gameStarted = false;
	this.score = 0;
	this.leftTime = 40;

	if(!$rootScope.user) {
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
				remainedWords = makeArrayCopy(words);
				if(words && words.length > 0) {
					self.currentWord = remainedWords[0];
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
			//reset the list of words
			remainedWords = makeArrayCopy(words);
		}
	}

	function makeArrayCopy(arrayToCopy) {
		return arrayToCopy.slice(0);
	}
 }]);
