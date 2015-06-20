'use strict';

angular.module('myApp.vote', ['ngRoute','ngResource','myApp.resources'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vote', {
        templateUrl: 'vote/vote.html',
        controller: 'VoteCtrl'
    })
}])
.controller('VoteCtrl',['$scope','Events',function($scope,Events){

        $scope.like= function(){
            console.log("LIKE");
            vote("LIKE")
        };

       $scope.dislike=function(){
           console.log("LIKE");
           vote("DISLIKE");
       };

       var vote =function(type){
           var vote = Events;
           vote.type=type;
           console.log(vote);
           vote.save();
       }
}]);