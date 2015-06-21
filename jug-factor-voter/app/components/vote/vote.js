'use strict';
angular.module('myApp.vote', ['ngRoute','ngResource'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vote/:token', {
        templateUrl: 'vote/vote.html',
        controller: 'VoteCtlr'
    })
}]).factory('Vote',['$resource',function($resource){
        return $resource('api/',{token:'@token'},{

        })
}]).controller('VoteCtrl',['$scope','$routeParams','Vote',function($scope, $routeParams,Vote){
        var vote = new Vote({token:'alamakota'});
        $scope.like= function(){
            vote.type='LIKE';
            vote.$save();
        }
}])