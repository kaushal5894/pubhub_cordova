angular.module('eventSearch', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('eventSearch').
  component('eventSearch', {
      templateUrl: 'app/event/event-search/event-search.html',
      controller: 'EventSearchController'
  });
