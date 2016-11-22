"use strict";angular.module("wordPuzzleGameApp",["ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/wordpuzzle",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"})}]).directive("highScore",function(){return{restrict:"E",scope:{highscoreInfo:"=info"},templateUrl:"views/highscore.html"}}),angular.module("wordPuzzleGameApp").controller("MainCtrl",["$rootScope","$scope","$location","$interval","$timeout","DynamicDataService",function(a,b,c,d,e,f){function g(){f.updateUserScore(a.user.username,t.roundScore),a.user.score=t.roundScore}function h(){f.getHighscore().then(function(a){b.highScore=a},function(a){console.log(a)})}function i(){f.getWords().then(function(a){r=a,s=m(r),r&&r.length>0&&(t.currentWord=s[0],s.shift())},function(a){console.log(a)})}function j(){if(t.shouldCheckWord=!1,t.isWordCorrect=!1,t.guessedWord="",s&&s.length>0){t.currentWord=s[0];var a=0;a=t.currentWord.correctWord.length,v=Math.floor(Math.pow(1.95,a/3)),s.shift()}else l()}function k(){t.shouldCheckWord=!0,0>v&&(v=0),t.guessedWord===t.currentWord.correctWord?(t.isWordCorrect=!0,t.roundScore+=v,e(function(){j()},300)):t.isWordCorrect=!1}function l(){s=m(r)}function m(a){return a.slice(0)}function n(){var a=d(function(){t.leftTime>0?q():(o(),t.endGame())},1e3);return a}function o(){d.cancel(t.stopTimer)}function p(){t.leftTime=40}function q(){t.leftTime-=1}var r=[],s=[],t=this,u="",v=0;b.guessedWord="",this.roundScore=0,this.currentWord={},this.user=a.user,this.gameStarted=!1,this.gameEnded=!1,this.score=0,this.leftTime=40,this.stopTimer=null,this.shouldCheckWord=!1,this.isWordCorrect=!1,a.user||c.path("/"),h(),i(),this.startGame=function(){this.gameStarted=!0,this.gameEnded=!1,this.shouldCheckWord=!1,this.roundScore=0,j(),this.stopTimer=n()},this.endGame=function(){this.gameStarted=!1,this.gameEnded=!0,this.shouldCheckWord=!1,this.stopTimer&&o(),p(),this.roundScore>a.user.score&&g()},this.onGetNextWord=function(){j()},this.onWordSubmit=function(){k()},this.onWordKeyDown=function(){u=t.guessedWord},this.onWordKeyUp=function(a){var b=a.keyCode||a.charCode,c=u.length-t.guessedWord.length;c>0&&(8===b||46===b)&&v>0&&(v-=c),13===b?k():39===b&&this.onGetNextWord()}}]),angular.module("wordPuzzleGameApp").controller("LoginCtrl",["$rootScope","$location","DynamicDataService",function(a,b,c){var d=this;this.invalidUsername=!1,this.connectUser=function(d){d?c.getUser(d).then(function(c){a.user=c,b.path("wordpuzzle")},function(a){console.log(a)}):this.invalidUsername=!0},this.onUserKeyUp=function(a,b){var c=a.keyCode||a.charCode;13===c&&d.connectUser(b)}}]),angular.module("wordPuzzleGameApp").service("DynamicDataService",["$http","$q","$interval",function(a,b,c){this.getUser=function(c){var d=this,e=b.defer(),f=null,g="https://firstproject-772d8.firebaseio.com/users/"+c+".json";return a.get(g).then(function(a){a.data?(f={username:c,score:a.data.score},e.resolve(f)):(f={username:c,score:0},d.createUser(c).then(function(){e.resolve(f)},function(a){console.log(a),e.reject()}))},function(a){console.log(a),e.reject()}),e.promise},this.getUsers=function(){var c=b.defer(),d=[],e="https://firstproject-772d8.firebaseio.com/users.json";return a.get(e).then(function(a){var b=a.data;for(var e in b)d.push({username:e,score:b[e]});c.resolve(d)},function(a){console.log(a),c.reject()}),c.promise},this.getHighscore=function(){function d(){g.length=0,a.get(f).then(function(a){function b(a,b){return a.score<b.score?1:a.score>b.score?-1:0}var c=a.data;for(var d in c)g.push({username:d,score:c[d].score});g.sort(b),e.resolve(g)},function(a){console.log(a),e.reject()})}var e=b.defer(),f='https://firstproject-772d8.firebaseio.com/users.json?orderBy="score"&limitToLast=10',g=[];return d(),c(d,1e4),e.promise},this.getWords=function(){var c=b.defer(),d=[],e="https://firstproject-772d8.firebaseio.com/words.json";return a.get(e).then(function(a){var b=a.data;for(var e in b)d.push({correctWord:e,magledWord:b[e]});c.resolve(d)},function(a){console.log(a),c.reject()}),c.promise},this.createUser=function(c){var d=b.defer(),e="https://firstproject-772d8.firebaseio.com/users.json",f={};return f[c]={score:0},a.patch(e,f).then(function(a){d.resolve(a.data)},function(a){console.log(a),d.reject()}),d.promise},this.updateUserScore=function(c,d){var e=b.defer(),f={score:d},g="https://firstproject-772d8.firebaseio.com/users/"+c+".json";return a.patch(g,f).then(function(a){e.resolve(a)},function(a){console.log(a),e.reject()}),e.promise}}]),angular.module("wordPuzzleGameApp").run(["$templateCache",function(a){a.put("views/highscore.html",'<table class="table table-condensed highscore"> <thead> <tr> <th colspan="3">High Score</th> </tr> </thead> <tbody> <tr ng-repeat="player in highscoreInfo"> <td>{{$index + 1}} .</td> <td>{{ player.username }}</td> <td>{{ player.score }}</td> </tr> </tbody> </table>'),a.put("views/login.html",'<div class="login form-group"> <h2 class="login-heading">Please sign in to play</h2> <input type="text" class="form-control" id="username" placeholder="username" ng-model="username" ng-keyup="login.onUserKeyUp($event, username)"> <button class="btn btn-md btn-primary btn-block" ng-click="login.connectUser(username)" id="connect-user" type="submit"> Play game! </button> <div ng-show="login.invalidUsername" id="invalid-username">Please, enter an username</div> </div>'),a.put("views/main.html",'<div class="row" id="game-wrapper"> <div class="col-md-3"> <high-score info="highScore"></high-score> </div> <div class="col-md-8" id="play-game-wrapper"> <div> <button ng-show="!vm.gameStarted" type="button" class="btn btn-primary" ng-click="vm.startGame()">Start Game</button> <button ng-show="vm.gameStarted" type="button" class="btn btn-primary" ng-click="vm.endGame()">End Game</button> <div id="countdown"> <b>Time left:</b> <span class="badge">{{vm.leftTime}}</span> </div> <div id="user-score"> Score <span class="label label-success">{{vm.roundScore}}</span> </div> </div> <div ng-show="vm.gameStarted"> <form class="form-horizontal" id="game"> <div class="form-group"> <label class="col-md-2 control-label">Magled word:</label> <div class="col-md-9 magled-word">{{vm.currentWord.magledWord | uppercase}}</div> </div> <div class="form-group" ng-class="{\'has-success has-feedback\': (vm.shouldCheckWord && vm.isWordCorrect), \'has-error has-feedback\': vm.shouldCheckWord && !vm.isWordCorrect}"> <label class="col-md-2 control-label">Correct word:</label> <div class="col-md-9"> <input class="form-control" id="correct-word" type="text" ng-model="vm.guessedWord" ng-keyup="vm.onWordKeyUp($event)" ng-keydown="vm.onWordKeyDown()"> <span ng-class="{\'glyphicon glyphicon-ok form-control-feedback\': (vm.shouldCheckWord && vm.isWordCorrect), \'glyphicon glyphicon-remove form-control-feedback\': (vm.shouldCheckWord && !vm.isWordCorrect)}"></span> </div> </div> <div class="form-group"> <div class="col-md-9 col-md-offset-2 word-game-actions"> <button type="button" class="btn btn-primary" ng-click="vm.onWordSubmit()">Submit</button> <button type="button" class="btn btn-primary" ng-click="vm.onGetNextWord()">Next word</button> </div> <div class="clearfix"></div> </div> </form> </div> <div ng-show="vm.gameEnded" id="game-over">Game over!</div> <div id="user-best-score"> Best score until now: <span class="label label-success">{{vm.user.score}}</span> </div> </div> </div>')}]);