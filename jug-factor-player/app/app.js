'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.player',
  'myApp.admin',
  'myApp.presentations',
  'ui.bootstrap.datetimepicker'
])
.value('serverUrl', 'http://localhost:8080')
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/presentations'});
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
