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
    .controller('AdminCtrl',['$scope','$resource','$interval','Presentation',function($scope,$resource,$interval,Presentation){
        $scope.presentation=new Presentation();
        $scope.events = [];
        $scope.clapper={};
        //new Events().query(
        //    {eventType:'clapper'}
        //).$promise.then(function(data){
        //    console.log(data);
        //});
        var evnentsResource = new $resource('http://localhost:8080/annotationEvent');
        evnentsResource.query({eventType:'clapper'}).$promise.then(function(result){
            $scope.events=result;
        });

        var checkDuration={};

        $scope.$watch('presentation.url',function(){
            if($scope.presentation.url!=undefined){
                $scope.pop=Popcorn.smart( "#video", $scope.presentation.url);
                $scope.pop.controls( true );
                $scope.pop.play();
                checkDuration = $interval(function() {
                        $scope.presentation.duration = $scope.pop.duration();
                        if($scope.presentation.duration!=NaN){
                            $interval.cancel(checkDuration);
                        }
                    },1000
                )

            } else {

                delete $scope.pop;
            }
        },true)


        $scope.save= function(){
            if($scope.presentation.duration!=NaN){
                $interval.cancel(checkDuration);
                $scope.presentation.duration = $scope.pop.duration();

                $scope.presentation.startTime=$scope.clapper.timestamp;
                console.log($scope.presentation);
                $scope.presentation.$save();
                window.location.reload();
            }
        }

    }]);