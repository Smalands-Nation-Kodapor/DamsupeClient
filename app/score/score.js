"use strict";


(function(angular){

  angular.module('clientApp.score', [])

  .factory("Score", ["$firebaseObject",
    function($firebaseObject) {
      return function(team) {
        var firebaseRef = new Firebase("https://brilliant-torch-3682.firebaseIO.com");
        var scoreRef = firebaseRef.child("teams/"+ team + "/score");
        return $firebaseObject(scoreRef);
      }
    }
  ]);


} (angular));
