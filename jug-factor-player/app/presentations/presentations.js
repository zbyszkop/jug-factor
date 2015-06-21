'use strict';

angular.module('myApp.presentations', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/presentations', {
        templateUrl: 'presentations/presentations.html',
        controller: 'PresentationsCtrl'
    });
}])

.controller('PresentationsCtrl', ['$scope', 'PresentationService', function($scope, PresentationService) {
     
        $scope.presentations
        
        PresentationService.query(function(presentations) {
                $scope.presentations = presentations

        })
}])
    
.factory('PresentationService', ['$resource',
    function($resource){
        return new $resource('http://localhost:8080/presentation/:id')
}])