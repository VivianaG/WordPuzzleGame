'use strict';

/**
* @ngdoc function
* @name wordPuzzleGameApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the wordPuzzleGameApp
*/
angular.module('wordPuzzleGameApp')
.controller('MainCtrl', ['$rootScope', '$scope', '$location', '$interval', '$timeout', 'DynamicDataService',
	function ($rootScope, $scope, $location, $interval, $timeout, DynamicDataService) {
	function updateUserScore() {
		DynamicDataService.updateUserScore($rootScope.user.username, self.roundScore);
		$rootScope.user.score = self.roundScore;
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
		self.guessedWord = '';

		//make sure we have another word in queue
		if(remainedWords  && remainedWords.length > 0) {
			self.currentWord = remainedWords[0];

			var currentWordLength = 0;
			currentWordLength = self.currentWord.correctWord.length;
			wordScore = Math.floor(Math.pow(1.95, currentWordLength / 3));

			remainedWords.shift();
		}
		else {
			//reset the list of words
			refreshWordList();
		}
	}

	function evaluateWord() {
		self.shouldCheckWord = true;

		//always make sure that the score has positive value
		if(wordScore < 0) {
			wordScore = 0;
		}
		if(self.guessedWord === self.currentWord.correctWord) {
			self.isWordCorrect = true;
			self.roundScore += wordScore;

			//keep styling for success active some time
			$timeout(function() {
				getNextWord();
			}, 300);
		}
		else {
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
			}
			else {
				stopCountdown();
				self.endGame();
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

	var words = [];
	var remainedWords = [];
	var self = this;
	var wordEvaluation = '';
	var wordScore = 0;

	$scope.guessedWord = '';
	this.roundScore = 0;
	this.currentWord = {};
	this.user = $rootScope.user;
	this.gameStarted = false;
	this.gameEnded = false;
	this.score = 0;
	this.leftTime = 40;
	this.stopTimer = null;
	this.shouldCheckWord = false;
	this.isWordCorrect = false;

	if(!$rootScope.user) {
		//go to login page
		$location.path('/');
	}

	getHighScores();
	getWords();

	this.startGame = function() {
		this.gameStarted = true;
		this.gameEnded = false;
		this.shouldCheckWord = false;
		this.roundScore = 0;
		getNextWord();
		this.stopTimer = startCountdown();
	};

	this.endGame = function() {
		this.gameStarted = false;
		this.gameEnded = true;
		this.shouldCheckWord = false;
		if(this.stopTimer) {
			stopCountdown();
		}
		resetCountdown();

		//make sure to update the server score for the user
		//if the round score is greater than the server side score for the user
		if(this.roundScore > $rootScope.user.score) {
			updateUserScore();
		}
	};

	this.onGetNextWord = function() {
		getNextWord();
	};

	this.onWordSubmit = function() {
		evaluateWord();
	};

	this.onWordKeyDown = function() {
		//save the word before possible delete
		wordEvaluation = self.guessedWord;
	};

	this.onWordKeyUp = function(event) {
		var key = event.keyCode || event.charCode;
		var noOfDelLetters = wordEvaluation.length - self.guessedWord.length;

		/*if the user deletes one ore more characters, then update the score for a word*/
		if(noOfDelLetters > 0 && (key === 8 || key === 46)) {
			//update the score if deleting
			if(wordScore > 0) {
				wordScore -= noOfDelLetters;
			}
		}
		//check for 'enter' key
		if(key === 13) {
			//check if it is the correct word
			evaluateWord();
		}
		//if the user enters 'arrow right' key,
		//then get next word
		else if(key === 39) {
			this.onGetNextWord();
		}
	};
}]);
