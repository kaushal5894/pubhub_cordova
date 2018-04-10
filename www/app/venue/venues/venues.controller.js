angular.module('venues')
  .controller('VenuesController', function ($scope, uiGmapGoogleMapApi, pubhub, $q, spinnerService) {
      var $ctrl = this;
      var cancelGet = $q.defer();
      var isInitialLoad = true;
      spinnerService.showSpinner();
      $ctrl.venues = null;
      var urlValues = window.location.href.split('?')
      var features;
      var location;
      if (urlValues.length > 1) {
          features = urlValues[1].split('&');
      }
      var DataForService = '';
      if (features != undefined && features.length > 1) {
          angular.forEach(features, function (value, key) {
              if (value.indexOf('location') != -1) {
                  location = value.split('=')[1];
              }
              else {
                  DataForService += "&" + value;
              }
          });
      }
      else if (features != undefined && features.length == 1 && features[0].indexOf('location') != -1) {
          location = features[0].split('=')[1];
      }
      if (DataForService == '' && location == undefined) {
          pubhub.getVenuesList(DataForService).then(function (data) {
              if (isInitialLoad) {
                  spinnerService.hideSpinner();
              }
              if (!data) {
                  console.log('Search cancelled');
                  $ctrl.venues = [];
                  return;
              }
              if (!data.length) {
                  console.log('No data found');
                  $ctrl.venues = [];
                  return;
              }
              isInitialLoad = false;
              $ctrl.venues = data;
          })
      }
      else {
          pubhub.getSearchVenuesList(location, DataForService).then(function (data) {
              if (isInitialLoad) {
                  spinnerService.hideSpinner();
              }
              if (!data) {
                  console.log('Search cancelled');
                  $ctrl.venues = [];
                  return;
              }
              if (!data.length) {
                  console.log('No data found');
                  $ctrl.venues = [];
                  return;
              }
              isInitialLoad = false;
              $ctrl.venues = data;
          })
      }
  })
