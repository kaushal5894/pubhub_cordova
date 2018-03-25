angular.module('eventListItem', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('eventListItem').
  component('eventListItem', {
      templateUrl: 'app/event/event-list-item/event-list-item.html',
      controller: 'EventListItemController',
      bindings: {
          event: '=',
          swipeIcon: '@',
          swipeText: '@',
          swipeAction: '&'
      }
 
  });
