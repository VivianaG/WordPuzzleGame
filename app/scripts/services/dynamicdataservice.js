'use strict';

/**
 * @ngdoc service
 * @name wordPuzzleGameApp.DynamicDataService
 * @description
 * # DynamicDataService
 * Service in the wordPuzzleGameApp.
 */
 angular.module('wordPuzzleGameApp')
 .service('DynamicDataService', function ($http, $q) {

    this.connectToDatabase = function() {
        //make sure to initialize the app only once

        //if the app hasn't been initialized yet
        if(firebase.apps.length === 0) {
            var config = {
                apiKey: "AIzaSyC-VHZ6b_lOgP_YUru_7d7NB0oSP3OscJ4",
                authDomain: "firstproject-772d8.firebaseapp.com",
                databaseURL: "https://firstproject-772d8.firebaseio.com",
                storageBucket: "firstproject-772d8.appspot.com",
                messagingSenderId: "769228797734"
            };
            //then, initialize it
            firebase.initializeApp(config);
        }
    };

    this.getUser = function(username) {
        var self = this;
        var deferred = $q.defer();
        var result = null;

        this.connectToDatabase();
        firebase.database().ref("users/" + username).on("value", function(snapshot) {
            //if the user doesn't exist
            if(snapshot.val() === null) {
                //create user
                result = {username: username, score: 0};
                self.createUser(username);
            }
            //else, get user
            else {
                result = {username: snapshot.key, score: snapshot.val().score};
            }
            deferred.resolve(result);
        });

        return deferred.promise;
    };


    this.getUsers = function() {
        var deferred = $q.defer();
        var users = [];

        this.connectToDatabase();
        firebase.database().ref("users/").orderByValue().on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                users.push({username: data.key, score: data.val().score});
            })
            deferred.resolve(users);
        });
        return deferred.promise;
    };

    this.getHighscore = function() {
        var deferred = $q.defer();
        var users = [];

        this.connectToDatabase();
        firebase.database().ref("users/").orderByChild("score").limitToLast(10).on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                users.push({username: data.key, score: data.val().score});
            });
            //get users list in descending order
            deferred.resolve(users.reverse());
        });
        return deferred.promise;
    };


    this.getWords = function() {
        var deferred = $q.defer();
        var words = [];

        this.connectToDatabase();
        firebase.database().ref("words/").orderByValue().on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                words.push({correctWord: data.key, magledWord: data.val()});
            })
            deferred.resolve(words);
        });
        return deferred.promise;
    };

    this.createUser = function(username) {
        this.connectToDatabase();
        firebase.database().ref('users/' + username).set({score: 0});
    };

    this.updateUserScore = function(username, newScore) {
        this.connectToDatabase();
        firebase.database().ref('users/' + username).set({score: newScore});
    }
});