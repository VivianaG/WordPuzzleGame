'use strict';

/**
 * @ngdoc overview
 * @name wordPuzzleGameApp
 * @description
 * # wordPuzzleGameApp
 *
 * Main module of the application.
 */
 angular
  .module('wordPuzzleGameApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/wordpuzzle', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('highScore', function() {
      return {
        restrict: 'E',
        scope: {
          highscoreInfo: '=info'
        },
        templateUrl: '../../views/highscore.html',
      };
    });
