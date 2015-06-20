'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.vote',
  'myApp.clapper',
  'myApp.resources',
  'ngResource'

]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/vote'});
}]);
