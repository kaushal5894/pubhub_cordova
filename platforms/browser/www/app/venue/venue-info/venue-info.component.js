angular.module('venueInfo', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('venueInfo').
  component('venueInfo', {
      templateUrl: 'app/venue/venue-info/venue-info.html',
      controller: 'VenueInfoController',
      bindings: {
          venue: '<'
      }
  });
