angular.
  module('venueList').
  component('venueListItem', {
      templateUrl: 'app/venue/venue-list-item/venue-list-item.html',
      controller: 'VenueListItemController',
      bindings: {
          venue: '=',
          swipeIcon: '@',
          swipeText: '@',
          swipeAction: '&'
      }
 
  });
