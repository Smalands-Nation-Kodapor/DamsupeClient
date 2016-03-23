"use strict";

var app = angular.module('clientApp', [
  'ngRoute',
  'firebase',
  'clientApp.audio',
  'clientApp.soundfactory',
  'clientApp.videofactory',
  'clientApp.video',
  'clientApp.event',
  'clientApp.display',
  'clientApp.score',
  'clientApp.manager'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/display'
      });
}]);
