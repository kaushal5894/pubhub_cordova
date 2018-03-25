angular.module('venueMap', [
  'ngMaterial', 'ngRoute', 'spinner'
]);

angular.
  module('venueMap').
  component('venueMap', {
      templateUrl: 'app/venue/venue-map/venue-map.html',
      controller: 'VenueMapController',
      bindings: {
          venues: '='
      }
  });
