angular.module('myApp.clapper', ['ngRoute','ngResource','myApp.resources'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/clapper', {
            templateUrl: 'clapper/clapper.html',
            controller: 'ClapperCtrl'
        })
    }])
    .controller('ClapperCtrl',['$scope','Events',function($scope,Events){
        $scope.color='red';
        $scope.claps=function(){

            if($scope.color=='red') {
                $scope.color = 'green';
                var clapper = new Events();
                clapper.eventType="clapper";
                clapper.id="ala ma kota";
                clapper.$save();
            } else {
                $scope.color = 'red';
            }
        };
    }]

);