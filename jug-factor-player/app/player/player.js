'use strict';

angular.module('myApp.player', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player/:id', {
    templateUrl: 'player/player.html',
    controller: 'PlayerCtrl'
  });
}])
    .controller('PlayerCtrl', ['$scope', '$timeout', '$interval', '$routeParams', 'PresentationService', 
        function($scope, $timeout, $interval, $routeParams, PresentationService) {

        $scope.width = 960;
        $scope.seekbarCtx = document.getElementById("seekbar").getContext("2d");
        $scope.seekbarCtx.clearRect(0, 0,  $scope.width, 100);
        $scope.footnote = ""
        $scope.presentation = {}
        PresentationService.get({"id": $routeParams.id}, function(value) {
            $scope.presentation = value;
            console.log($scope)
            $scope.pop = Popcorn.smart( "#video", $scope.presentation.videoUrl);
            $scope.pop.controls( true );
            $scope.presentation.annotations.forEach(function(annotation) {
                $scope.pop.cue(annotation.offset, function() {$scope.$emit("footnoteChange", annotation)});

            });

            $scope.timeInterval = $interval(function() {
                var duration = $scope.pop.duration()
                var currentTime = $scope.pop.roundTime()
                if (!isNaN(duration)) {


                    if (!$scope.drawnAnnotations) {
                        $scope.presentation.annotations.forEach(function(annotation) {
                            $scope.seekbarCtx.globalAlpha=1.0;

                            function fillRect(color, annotation) {
                                $scope.seekbarCtx.fillStyle = color;
                                $scope.seekbarCtx.fillRect($scope.width * annotation.offset / duration, 0, $scope.width * 5 / duration, 100);
                            }

                            if (annotation.eventType == 'like') {
                                fillRect("#003cb3", annotation);
                            }
                            if (annotation.eventType == 'dislike') {
                                fillRect("#cf293f", annotation);
                            }
                            if (annotation.eventType == 'comment') {
                                fillRect("#f2e699", annotation);
                            }
                            $scope.drawnAnnotations = true

                        })
                    } else {
                        var playbackWidth = $scope.width * currentTime / duration
                        $scope.seekbarCtx.fillStyle = "#0b8027";
                        $scope.seekbarCtx.globalAlpha=0.01;
                        $scope.seekbarCtx.fillRect(0, 0, playbackWidth, 100);
                    }
                }

            })
            
            $scope.pop.play();

        })

        $scope.annotationRects = []

        $scope.currentTime = {}
        $scope.duration = {}
        $scope.playbackWidth = 0.0
        $scope.drawnAnnotations = false

        $scope.footnoteTimeout = {}



        $scope.timeoutFootnote = function() {
            $scope.footnoteTimeout = $timeout(function () {
                $scope.footnote = ""
                $scope.$apply()
            }, 5000)
        }



        $scope.$on("footnoteChange" , function (event, annotation)  {
            console.log($scope)
            if(annotation.eventType === 'like') {
                $scope.footnote = "Komuś się podoba!!";

            }
            if(annotation.eventType == 'dislike') {
                $scope.footnote = "Komuś się NIE podoba :(";

            }
            if(annotation.eventType == 'comment') {
                console.log(annotation)
                $scope.footnote = annotation.comment;
            }
            $scope.$apply()
            if(typeof $scope.footnoteTimeout !== 'undefined') {
                $timeout.cancel($scope.footnoteTimeout);
            }
            $scope.timeoutFootnote();
        });




       
    }])

.factory('PresentationService', ['$resource',
  function($resource){
    return new $resource('http://localhost:8080/presentation/:id')
  }])
.directive('footnote', function() {
        return {
            link: function($scope, element, attr) {
                $scope.$watch(function() { return $scope.footnote }, function(value) {
                    console.log(value)
                    element.text=value
                    
                })
                
            }
            
        }
        
    })