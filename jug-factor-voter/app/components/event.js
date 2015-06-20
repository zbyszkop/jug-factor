'use strict';

angular.module('myApp.resources',['ngResource']).
    factory('Events',['$resource',function($resource){
        return $resource('/api/event');
    }]);