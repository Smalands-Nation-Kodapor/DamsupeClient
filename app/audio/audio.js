"use strict";

(function(angular){

  angular.module('clientApp.audio', [])

  .factory('Audio', ['Event', 'SoundEffects',
    function(Event, SoundEffects) {

      var playing = [];

      var Audio = {};
      Audio.sounds = {};

      var soundeffects = SoundEffects();
      var eventRef = Event;

      Audio.register = function() {
        eventRef.registerEvent("playsound", playSound);
        eventRef.registerEvent("stopsound", stopSound);
        eventRef.registerEvent("pausesound", pauseSound);
      }


      soundeffects.$loaded(function(){
        Audio.sounds = soundeffects.getSounds();
      })



      function playSound(sb) {
        var sound = Audio.sounds[sb.name];
        if (sound) {
          sound.play(function(playid){
            playing.push({name: sb.name, id: playid});
          });
        }
      }

      function stopSound(sb) {
        var sound = Audio.sounds[sb.name];
        if (sound) {
          for (var i = 0; i < playing.length; i++) {
            if (playing[i].name === sb.name) {
              sound.stop(playing[i].id);
              playing.splice(i, 1);
            }
          }
        }
      }

      function pauseSound(sb) {
        var sound = Audio.sounds[sb.name];
        if (sound) {
          for (var i = 0; i < playing.length; i++) {
            if (playing[i].name === sb.name) {
              sound.pause(playing[i].id);
            }
          }
        }
      }

      return Audio;
    }
  ]);


}(angular));
