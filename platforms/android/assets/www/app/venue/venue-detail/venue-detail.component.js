angular.module('venueDetail', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('venueDetail').
  component('venueDetail', {
      templateUrl: 'app/venue/venue-detail/venue-detail.html',
      controller: 'VenueDetailController'
  });
