'use strict';

angular.module('myApp.player', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'player/player.html',
    controller: 'PlayerCtrl'
  });
}])

.controller('PlayerCtrl', ['$scope', '$timeout', '$interval' , 'PresentationService', function($scope, $timeout, $interval, PresentationService) {
        
        $scope.width = 960;

        $scope.footnote = ""
        $scope.presentation = {
            "id": "123123123",
            "videoUrl":"https://www.youtube.com/watch?v=Ms3jmcPQi70",
            "annotations": [
                {
                    "offset":1,
                    "eventType": "like"
                },
                {
                    "offset":4,
                    "eventType": "dislike"
                },
                {
                    "offset":1800,
                    "eventType":"comment",
                    "comment":"Dobrze prawi, dać mu piwa"
                },
                {
                    "offset":400,
                    "eventType": "like"
                },
                ,
                {
                    "offset":1500,
                    "eventType": "like"
                },

                {
                    "offset":1700,
                    "eventType": "dislike"
                }

            ]
        }
        
        $scope.annotationRects = []
        
        $scope.currentTime = {} 
        $scope.duration = {} 
        $scope.playbackWidth = 0.0
        $scope.drawnAnnotations = false
        
        $scope.footnoteTimeout = {}
        $scope.timeInterval = $interval(function() {
            var duration = $scope.pop.duration()
            var currentTime = $scope.pop.roundTime()
            if (duration != NaN) {
                var c = document.getElementById("seekbar");
                var playbackWidth = $scope.width * currentTime / duration
                var ctx = c.getContext("2d");
                ctx.fillStyle = "#0b8027";
                ctx.globalAlpha=0.2;
                ctx.fillRect(0, 0, playbackWidth, 100);
                ctx.globalAlpha=1.0;
                
                
                if (!$scope.annotations) {
                   $scope.presentation.annotations.forEach(function(annotation) {
                       function fillRect(color, annotation) {
                           ctx.fillStyle = color;
                           ctx.fillRect($scope.width * offset / duration, 0, $scope.width * 5 / duration, 100);
                       }

                       if (annotation.eventType == 'like') {
                           fillRect("#003cb3", annotation.offset);
                       }
                       if (annotation.eventType == 'dislike') {
                           fillRect("#cf293f", annotation.offset);
                       }
                       if (annotation.eventType == 'comment') {
                           fillRect("#f2e699", annotation.offset);
                       }
                       
                       
                   }) 
                }
            }
            
        })
        
        
        $scope.timeoutFootnote = function() {
            console.log("inside timeout footnote")
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
        

      

      $scope.pop = Popcorn.smart( "#video", $scope.presentation.videoUrl);
      $scope.pop.controls( true );
        console.log($scope)
      $scope.presentation.annotations.forEach(function(annotation) {
          $scope.pop.cue(annotation.offset, function() {$scope.$emit("footnoteChange", annotation)});

      });
      $scope.pop.play();
    }])
.factory('PresentationService', ['$resource',
  function($resource){
    var cos = {};
    cos.get = {
        "id": "123123123",
        "videoUrl":"http://www.youtube.com/watch?v=9oar9glUCL0",
        "annotations": [
            {
                "offset":123,
                "type": "like"
            },
            {
                "offset":645,
                "type": "dislike"
            }
        ]
    }
    return cos;
  }])
.directive('footnote', function() {
        return {
            link: function($scope, element, attr) {
                console.log($scope)
                $scope.$watch(function() { return $scope.footnote }, function(value) {
                    console.log(value)
                    element.text=value
                    
                })
                
            }
            
        }
        
    })