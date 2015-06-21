'use strict';

angular.module('myApp.vote', ['ngRoute','ngResource','myApp.resources'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vote', {
        templateUrl: 'vote/vote.html',
        controller: 'VoteCtrl'
    })
}])
.controller('VoteCtrl',['$scope','$timeout','Events',function($scope,$timeout,Events){
        $scope.comment='';
        $scope.alerts=[];

        $scope.like= function(){
            console.log("LIKE");
            vote("like")
        };

       $scope.dislike=function(){
           console.log("DISLIKE");
           vote("dislike");

       };

       var vote = function(type){
           var vote = new Events();
           vote.eventType=type;
           console.log("Vote!");
           console.log(vote);
           vote.$save(function(){
           $scope.alerts.unshift({type:"success",message:(type=='like'?"Polubiłeś":"Nie spodobało się")})
           },errorDisplay);
       };

        $scope.addAlert = function(alert) {
            $scope.alerts.unshift(alert);

        };

        $timeout(function(){
          $scope.closeAlert($scope.alerts.length-1);
        },5000);

        $scope.closeAlert = function(index) {
            console.log($scope.alerts.splice(index, 1));

        };



        $scope.comments = function(){
            var comment = new Events();
            comment.eventType="comment";
            comment.comment=$scope.comment;
            comment.$save(function(){
                $scope.comment='';
                $scope.alerts.unshift({type:"success",message:"Umieszczono komentarz"})
            }, errorDisplay);

            console.log("Comment: "+$scope.comment);
        };

        var errorDisplay=function (error){
            console.log(error);
            $scope.alerts.unshift({type:"danger","message":error.statusText})
        };
}]);