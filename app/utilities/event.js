"use strict";

(function(angular){
  angular.module('clientApp.event', [])

  .factory('Event', ['$firebaseObject',
    function($firebaseObject) {

      var ref = new Firebase("https://brilliant-torch-3682.firebaseIO.com/eventrunner/event");
      var eventRef = $firebaseObject(ref);
      var eventBindings = {};
      var unwatch;

      var eventObj = {};

      eventObj.listen = function () {
        unwatch = eventRef.$watch(function() {
          if (eventRef) {
            if (eventBindings[eventRef.eventType]) {
              eventBindings[eventRef.eventType](eventRef.eventBody);
            }
          }
        }
      )};

      eventObj.trigger = function(eventName) {
        if (eventBindings[eventName]) {
          eventBindings[eventName](eventName);
        }
      }

      eventObj.registerEvent = function(type, func) {
        eventBindings[type] = func;
      }

      eventObj.stopListening = function() {
        if(unwatch)
          unwatch();
      }
      return eventObj;
    }
  ]);

}(angular));
