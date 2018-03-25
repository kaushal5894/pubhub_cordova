angular.module('venueSearch')
  .controller('VenueSearchController', function ($scope, $http, pubhub, $location, $filter) {


      $scope.searchKeyWords = $location.search().q;


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
          console.debug(url);
          //$location.search('feature', 1)
          $location.url(url);
      }

      $scope.hideKeyboard = function () {
          window.cordova && cordova.plugins.Keyboard.close();
      }

      $scope.features = [];
      pubhub.getFeatures().then(function (data) {
          $scope.features = data;

      });


  })


