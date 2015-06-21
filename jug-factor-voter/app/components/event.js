'use strict';

angular.module('myApp.resources',['ngResource']).
    factory('Events',['$resource',function($resource){
        return $resource('http://localhost:8080/annotationEvent/');
    }]);