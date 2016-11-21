'use strict';

/**
 * @ngdoc function
 * @name wordPuzzleGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wordPuzzleGameApp
 */
 angular.module('wordPuzzleGameApp')
 .controller('MainCtrl', ["$rootScope", "$scope", "$location", "$interval", "$timeout", "DynamicDataService",
 	function ($rootScope, $scope, $location, $interval, $timeout, DynamicDataService) {

	var words = [];
	var remainedWords = [];
	var self = this;

	$scope.guessedWord = "";
	this.currentWord = {};
	this.user = $rootScope.user;
	this.gameStarted = false;
	this.score = 0;
	this.leftTime = 40;
	this.stopTimer = null;
	this.shouldCheckWord = false;
	this.isWordCorrect = false;

	if(!$rootScope.user) {
		//go to login page
		$location.path("/");
	}

	getHighScores();
	getWords();

	this.startGame = function() {
		this.gameStarted = true;
		this.shouldCheckWord = false;
		getNextWord();
		this.stopTimer = startCountdown();
	};

	this.endGame = function() {
		this.gameStarted = false;
		this.shouldCheckWord = false;
		if(this.stopTimer) {
			stopCountdown();
		}
		resetCountdown();
	}

	this.onGetNextWord = function() {
		getNextWord();
	}

	this.onWordSubmit = function() {
		evaluateWord();
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
		self.shouldCheckWord = false;
 		self.isWordCorrect = false;
		self.guessedWord = "";

		//make sure we have another word in queue
		if(remainedWords  && remainedWords.length > 0) {
			self.currentWord = remainedWords[0];
			remainedWords.shift();
		} else {
			//reset the list of words
			refreshWordList();
		}
	}

	function evaluateWord() {
		self.shouldCheckWord = true;

		if(self.guessedWord === self.currentWord.correctWord) {
			self.isWordCorrect = true;

			//keep styling for success active some time
			$timeout(function() {
				getNextWord();
			}, 300);
		} else {
			self.isWordCorrect = false;
		}
	}

	function refreshWordList() {
		remainedWords = makeArrayCopy(words);
	}

	function makeArrayCopy(arrayToCopy) {
		return arrayToCopy.slice(0);
	}

	function startCountdown() {
		var interval = $interval(function() {
			if(self.leftTime > 0) {
				updateCountdown();
			} else {
				stopCountdown();
			}
	}, 1000);
		return interval;
	}

	function stopCountdown() {
		$interval.cancel(self.stopTimer);
	}

	function resetCountdown() {
		self.leftTime = 40;
	}

	function updateCountdown() {
		self.leftTime -= 1;
	}
 }]);
