angular.module('myApp.admin', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'AdminCtrl'
        });
    }])
    .factory('Presentation',['$resource',function($resource){
        return $resource('http://localhost:8080/presentation');
    }])
    .factory('Events',['$resource'],function($resource){
        return $resource('http://localhost:8080/annotationEvent');
    })
    .controller('AdminCtrl',['$scope','Presentation',function($scope,Presentation,Events){
        $scope.presentation=new Presentation();
        $events=[];
        new Events().query(
            {eventType:'clapper'}
        ).$promise.then(function(data){
            console.log(data);
        });



        $scope.save= function(){
            $scope.presentation.duration = Popcorn.smart( "#video", $scope.presentation.url).duration();
            $scope.presentation.startTime=event.time;
        }

    }]);