angular.module('searchScreen')
  .controller('SearchScreenController', function ($scope, $http, pubhub, $timeout, $filter, $location) {
      var $ctrl = this;

      $scope.searchKeyWords = $location.search().q;

      $scope.showEvents = false;
      $scope.showVenues = false;
      $scope.showMap = true;
      $ctrl.venues = 123;

      $scope.features = [];
      pubhub.getFeatures().then(function (data) {
          $scope.features = data;
      });


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





      $scope.search = function () {

          var url = '/venues';
          var features = $filter('filter')($scope.features, { isSelected: true });

          angular.forEach(features, function (value, key) {
              if (key === 0) {
                  url += '?'
              } else {
                  url += '&'
              }
              url += 'feature=' + value.FeatureId;
          });

          if ($scope.searchKeyWords) {
              if (!features.length) {
                  url += '?'
              } else {
                  url += '&'
              }
              url += 'q=' + $scope.searchKeyWords;
          }
          
          $location.url(url);
      }

  })


