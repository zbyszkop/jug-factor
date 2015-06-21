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

        $scope.footnote = ""
        $scope.presentation = {}
        PresentationService.get({"id": $routeParams.id}, function(value) {
            $scope.presentation = value;

            $scope.pop = Popcorn.smart( "#video", $scope.presentation.videoUrl);
            $scope.pop.controls( true );
            $scope.presentation.annotations.forEach(function(annotation) {
                $scope.pop.cue(annotation.offset, function() {$scope.$emit("footnoteChange", annotation)});

            });

            $scope.timeInterval = $interval(function() {
                var duration = $scope.pop.duration()
                var currentTime = $scope.pop.roundTime()
                if (!isNaN(duration)) {
                    var c = document.getElementById("seekbar");
                    var playbackWidth = $scope.width * currentTime / duration
                    var ctx = c.getContext("2d");
                    ctx.fillStyle = "#0b8027";
                    ctx.globalAlpha=0.01;
                    ctx.fillRect(0, 0, playbackWidth, 100);
                    ctx.globalAlpha=1.0;


                    if (!$scope.drawnAnnotations) {
                        $scope.presentation.annotations.forEach(function(annotation) {
                            function fillRect(color, annotation) {
                                ctx.fillStyle = color;
                                ctx.fillRect($scope.width * annotation.offset / duration, 0, $scope.width * 5 / duration, 100);
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
            if(annotation.eventType === 'like') {
                $scope.footnote = "someone likes this";

            }
            if(annotation.eventType == 'dislike') {
                $scope.footnote = "someone doesn't like this";

            }
            if(annotation.eventType == 'comment') {
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