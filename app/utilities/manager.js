"use strict";

(function(angular){

  var boundObjects = [];

  angular.module('clientApp.manager', [])

  .factory("RegisterBinding", [function(){
    return function(object) {
        boundObjects.push(object);
    }
  }])

  .factory("DestroyBindings", [function(){
    return function() {
      for (var index = 0; index < boundObjects.length; index++) {
        boundObjects[index].$destroy();
      }
    }
  }])

}(angular));
