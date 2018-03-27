angular.module('venues')
  .controller('VenuesController', function ($scope, uiGmapGoogleMapApi, pubhub, $q, spinnerService) {
      var $ctrl = this;
      var cancelGet = $q.defer();
      var isInitialLoad = true;
      spinnerService.showSpinner();
      $ctrl.venues = null;
      pubhub.getVenuesList().then(function (data) {
          if (!data) {
              console.log('Search cancelled');
              return;
          }
          if (isInitialLoad) {
              spinnerService.hideSpinner();
          }
          if (!data.length) {
              console.log('No data found');
              $ctrl.venues = [];
              return;
          }
          isInitialLoad = false;
          $ctrl.venues = data;
      })
  })
