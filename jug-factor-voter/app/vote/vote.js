'use strict';

angular.module('myApp.vote', ['ngRoute','ngResource','myApp.resources'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vote', {
        templateUrl: 'vote/vote.html',
        controller: 'VoteCtrl'
    })
}])
.controller('VoteCtrl',['$scope','Events',function($scope,Events){
        $scope.comment='';
        $scope.alerts=[];

        $scope.like= function(){
            console.log("LIKE");
            vote("LIKE")
        };

       $scope.dislike=function(){
           console.log("DISLIKE");
           vote("DISLIKE");
       };

       var vote = function(type){
           var vote = Events;
           vote.type=type;
           console.log(vote);
           vote.save(function(){},errorDisplay);
       };

        $scope.addAlert = function(alert) {
            $scope.alerts.push(alert);

        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.comments = function(){
            var comment = Events;
            comment.eventType="COMMENT";
            comment.comment=$scope.comment;
            comment.save(function(){}, errorDisplay);
            console.log("Comment: "+$scope.comment);
        };

        var errorDisplay=function (error){
            console.log(error);
            $scope.alerts.push({type:"danger","message":error.statusText})
        };
}]);