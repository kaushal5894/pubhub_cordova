angular.module('eventSearch')
  .controller('EventSearchController', function ($scope, $http, pubhub, $location) {

      $scope.searchFor = 'offers'

      $scope.searchKeyWords = $location.search().q;

      $scope.features = pubhub.getFeatures();

      

      $scope.search = function () {

          var url = $scope.searchFor == 'events' ? '/events' : '/offers';

          if ($scope.searchKeyWords) {
              url += '?q=' + $scope.searchKeyWords;
          }

          console.debug(url);

          $location.url(url)
      }

      $scope.hideKeyboard = function () {
          window.cordova && cordova.plugins.Keyboard.close();
      }

  })


