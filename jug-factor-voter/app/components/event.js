'use strict';

angular.module('myApp.resources',['ngResource']).
    factory('Events',['$resource',function($resource){
        return $resource('http://172.16.101.151:8080/annotationEvent/');
    }]);