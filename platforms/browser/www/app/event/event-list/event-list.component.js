angular.module('eventList', [
  'ngMaterial', 'ngRoute', 'PubHub', 'spinner'
]);

angular.
  module('eventList').
  component('eventList', {
      templateUrl: 'app/event/event-list/event-list.html',
      controller: 'EventListController'
  });
