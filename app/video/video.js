"use strict";

(function(angular, $){
  angular.module('clientApp.video', [])

  .factory('Video', ['Event', 'Videos',
    function (Event, Videos) {

      var pfx = ["webkit", "moz", "MS", "o", ""];
      var moviescreen = document.getElementById("movie");
      var screenOpen = false;
      var animationRunning = false;

      var Video = {};
      var videos = Videos();
      Video.videos = {};

      videos.$loaded(function(){
        Video.videos = videos.getVideos();
      })

      var playingVideo;
      var playingVideoName = "";

      var eventRef = Event;

      Video.register = function() {
        eventRef.registerEvent("playvideo", play);
        eventRef.registerEvent("togglevideo", toggleScreen);
        eventRef.registerEvent("pausevideo", pause);
        eventRef.registerEvent("stopvideo", stop);
      }

      function toggleScreen(eb) {
        if (!animationRunning) {
          animationRunning = true;
          if (screenOpen) {
            moviescreen.classList.remove("animate-screen-show");
            moviescreen.classList.add("animate-screen-hide");
          } else {
            moviescreen.classList.add("animate-screen-show");
          }
        }
      }


      function play(eb) {

        if (playingVideo && playingVideo.getVideoObject().paused && playingVideoName === eb.name) {
          playingVideo.getVideoObject().play();
        } else if(playingVideo && playingVideo.getVideoObject() && playingVideoName !== eb.name) {
          var videoSource = Video.videos[eb.name];
          if (videoSource) {
            $(playingVideo.getVideoObject()).find('[type="video/mp4"]')[0].src = videoSource;
             playingVideo.getVideoObject().load();
             playingVideoName = eb.name;
          }
        } else {
          var videoSource = Video.videos[eb.name];
          if (videoSource) {
            $(moviescreen).vide(
              {
                mp4: videoSource
              },
              {
                volume: 1,
                playbackRate: 1,
                muted: false,
                loop: false,
                autoplay: true,
                position: '50% 50%',
                posterType: 'none',
                resizing: true//,
              }
            );
            playingVideo = $(moviescreen).data('vide');
            playingVideoName = eb.name;
          }
        }
      }

      function pause(eb) {
        if (playingVideo && !playingVideo.getVideoObject().ended &&
        !playingVideo.getVideoObject().paused && eb.name === playingVideoName) {
          playingVideo.getVideoObject().pause();
        }
      }

      function stop(eb) {
        if (playingVideo && playingVideoName === eb.name) {
          playingVideo.getVideoObject().load();
          playingVideo.getVideoObject().pause();
        }
      }



      PrefixedEvent(moviescreen, "AnimationEnd", function(e) {
        if (e.animationName === "hidescreen") {
          moviescreen.classList.remove("animate-screen-hide");
          screenOpen = false;
        } else if (e.animationName === "showscreen") {
          screenOpen = true;
        }
        animationRunning = false;
      });

      function PrefixedEvent(element, type, callback) {
         for (var p = 0; p < pfx.length; p++) {
             if (!pfx[p]) type = type.toLowerCase();
               element.addEventListener(pfx[p]+type, callback, false);
         }
      }

      return Video;
      //video.play();
      //console.log(video);

      //var instance = $('#video').data('vide');
      //instance.getVideoObject().pause();
      //instance.getVideoObject().play();
      //console.log(instance.getVideoObject());


    }
  ]);

}(angular, window.jQuery));
