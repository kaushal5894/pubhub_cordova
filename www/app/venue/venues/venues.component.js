angular.module('venues', [
  'ngMaterial', 'ngRoute', 'venueMap'
]);

angular.
  module('venues').
  component('venues', {
      templateUrl: 'app/venue/venues/venues.html',
      controller: 'VenuesController'
  });
