"use strict";

(function(angular){

  angular.module('clientApp.display', [])

  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/display', {
      controller: 'DisplayCtrl',
      templateUrl: 'display/display.html'
    });
  }])

  .controller('DisplayCtrl', ['$scope', 'Audio', 'Video', 'Event', 'Score', 'RegisterBinding',
    function ($scope, Audio, Video, Event, Score, RegisterBinding) {

      var audio = Audio;
      var video = Video;
      audio.register();
      video.register();

      var eventListener = Event;
      var stopListen = eventListener.listen();

      var blueScore = Score("blue");
      var redScore = Score("red");
      blueScore.$bindTo($scope, "blueScore");
      redScore.$bindTo($scope, "redScore");

      RegisterBinding(blueScore);
      RegisterBinding(redScore);



    }
  ]);

}(angular));
