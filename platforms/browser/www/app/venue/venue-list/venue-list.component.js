angular.module('venueList', [
  'ngMaterial', 'ngRoute', 'PubHub', 'angular-carousel'
]);

angular.
  module('venueList').
  component('venueList', {
      templateUrl: 'app/venue/venue-list/venue-list.html',
      controller: 'VenueListController',
      bindings: {
          swipeIcon: '@',
          swipeText: '@',
          venues: '='
      }
  });
