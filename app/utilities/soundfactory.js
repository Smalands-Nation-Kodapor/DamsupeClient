"use strict";

(function(angular){

  var app = angular.module('clientApp.soundfactory', []);

  app.factory('SoundArray', ['$firebaseArray',
    function($firebaseArray){
        return $firebaseArray.$extend({
          getSounds: function() {
            var sounds = {};
            angular.forEach(this.$list, function(s) {
              sounds[s.name] = new Howl({urls: [s.path + s.filename]});
            });
            return sounds;
          }
        });
    }
  ])

  app.factory("SoundEffects", ['SoundArray',
    function(SoundArray) {
      return function() {
        var ref = new Firebase("https://brilliant-torch-3682.firebaseIO.com/soundeffects");
        return SoundArray(ref);
      }
    }
  ]);

}(angular));
