angular.module('searchScreen')
  .controller('SearchScreenController', function ($scope, $http, pubhub, $timeout) {
      var $ctrl = this;

      $scope.showEvents = false;
      $scope.showVenues = false;
      $scope.showMap = true;
      $ctrl.venues = 123;


      $scope.showMapSection = function () {
          $scope.showEvents = false;
          $scope.showVenues = false;
          $scope.showMap = true;
          $("search-screen > md-list").addClass('slide').css("transform", "");
          $timeout(function() {
              $("search-screen > md-list").removeClass('slide');
          }, 300)
      }

      $scope.showEventsSection = function () {
          var offset = $(window).height() - 56 - 16 - 150;

          $scope.showEvents = true;
          $scope.showVenues = false;
          $scope.showMap = false;
          $("search-screen > md-list").addClass('slide').css("transform", "translateY(-" + offset + "px)");
          $timeout(function() {
              $("search-screen > md-list").removeClass('slide');
          }, 300)
      }

      $scope.showVenueSection = function () {
          var offset = $(window).height() - 56 - 16 - 150;

          $scope.showVenues = true;
          $scope.showEvents = false;
          $scope.showMap = false;
          $("search-screen > md-list").addClass('slide').css("transform", "translateY(-" + offset + "px)");
          $timeout(function() {
              $("search-screen > md-list").removeClass('slide');
          }, 300)

      }

      $(window).on("resize.doResize", function (){

          if ($scope.showEvents) {
            var offset = $(window).height() - 56 - 16 - 150;
            $("search-screen > md-list").css("transform", "translateY(-" + offset + "px)");

          } else if ($scope.showVenues) {
          var offset = $(window).height() - 56 - 16 - 150;
          $("search-screen > md-list").css("transform", "translateY(-" + offset + "px)");

          }
          
      });

      $scope.$on("$destroy",function (){
          $(window).off("resize.doResize"); //remove the handler added earlier
      });

  })


