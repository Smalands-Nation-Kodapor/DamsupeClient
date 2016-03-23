"use strict";

(function(angular){

  var app = angular.module('clientApp.videofactory', []);

  app.factory('VideoArray', ['$firebaseArray',
    function($firebaseArray){
        return $firebaseArray.$extend({
          getVideos: function() {
            var videos = {};
            angular.forEach(this.$list, function(s) {
              videos[s.name] = s.path + s.filename;
            });
            return videos;
          }
        });
    }
  ])

  app.factory("Videos", ['VideoArray',
    function(VideoArray) {
      return function() {
        var ref = new Firebase("https://brilliant-torch-3682.firebaseIO.com/videos");
        return VideoArray(ref);
      }
    }
  ]);

}(angular));
