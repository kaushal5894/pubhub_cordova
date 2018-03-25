angular.module('venueSearch', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('venueSearch').
  component('venueSearch', {
      templateUrl: 'app/venue/venue-search/venue-search.html',
      controller: 'VenueSearchController'
  });
