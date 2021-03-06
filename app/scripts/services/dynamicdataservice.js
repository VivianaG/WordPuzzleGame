'use strict';

/**
 * @ngdoc service
 * @name wordPuzzleGameApp.DynamicDataService
 * @description
 * # DynamicDataService
 * Service in the wordPuzzleGameApp.
 */
 angular.module('wordPuzzleGameApp')
 .service('DynamicDataService', ['$http', '$q', '$interval', function ($http, $q, $interval) {

    this.getUser = function(username) {
        var self = this;
        var deferred = $q.defer();
        var result = null;
        var url = 'https://firstproject-772d8.firebaseio.com/users/' + username + '.json';

       $http.get(url).then(
            function(res) {
                if(!res.data) {
                    //create new user
                    result = {username: username, score: 0};
                    self.createUser(username).then(
                        function() {
                            deferred.resolve(result);
                        },
                        function(error){
                            console.log(error);
                            deferred.reject();
                        });
                }
                else {
                    result = {username: username, score: res.data.score};
                    deferred.resolve(result);
                }
            },
            function(err) {
                console.log(err);
                deferred.reject();
            }

        );
        return deferred.promise;
    };

    this.getUsers = function() {
        var deferred = $q.defer();
        var users = [];
        var url = 'https://firstproject-772d8.firebaseio.com/users.json';

        $http.get(url).then(
            function(res) {
                var resData = res.data;
                for(var user in resData) {
                    users.push({username: user, score: resData[user]});
                }
                deferred.resolve(users);
            },
            function(err) {
                console.log(err);
                deferred.reject();
            }
            );
        return deferred.promise;
    };

    this.getHighscore = function() {
        var deferred = $q.defer();
        var url = 'https://firstproject-772d8.firebaseio.com/users.json?orderBy="score"&limitToLast=10';
        var users = [];

        function getScores() {
            users.length = 0;
            $http.get(url).then(
                function(res) {
                    var resData = res.data;
                    function sortDescendingScores(a, b) {
                        if (a.score < b.score) {
                            return 1;
                        }
                        if (a.score > b.score) {
                            return -1;
                        }
                        return 0;
                    }

                    for(var user in resData) {
                        users.push({username: user, score: resData[user].score});
                    }
                    //sort them in descending order
                    users.sort(sortDescendingScores);
                    deferred.resolve(users);
                },
                function(err) {
                    console.log(err);
                    deferred.reject();
                }
            );
        }

        //show highscore
        getScores();
        //refresh highscore
        $interval(getScores, 10000);

        return deferred.promise;
    };


    this.getWords = function() {
        var deferred = $q.defer();
        var words = [];
        var url = 'https://firstproject-772d8.firebaseio.com/words.json';

        $http.get(url).then(
            function(res) {
                var resData = res.data;
                for(var wordMatch in resData) {
                    words.push({correctWord: wordMatch, magledWord: resData[wordMatch]});
                }
                deferred.resolve(words);
            },
            function(err) {
                console.log(err);
                deferred.reject();
            }
            );
        return deferred.promise;
    };

    this.createUser = function(username) {
        var deferred = $q.defer();
        var url = 'https://firstproject-772d8.firebaseio.com/users.json';

        var newUser = {};
        newUser[username] = {'score': 0};

        $http.patch(url, newUser).then(
            function(res) {
                deferred.resolve(res.data);
            },
            function(error) {
                console.log(error);
                deferred.reject();
            }
            );
        return deferred.promise;
    };

    this.updateUserScore = function(username, newScore) {
        var deferred = $q.defer();
        var newScoreForUser = {'score': newScore};
        var url = 'https://firstproject-772d8.firebaseio.com/users/' + username + '.json';

        $http.patch(url, newScoreForUser).then(
            function(res) {
                deferred.resolve(res);
            },
            function(error) {
                console.log(error);
                deferred.reject();
            }
            );
        return deferred.promise;
    };
}]);