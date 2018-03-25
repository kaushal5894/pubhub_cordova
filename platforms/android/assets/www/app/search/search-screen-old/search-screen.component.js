angular.module('searchScreen', [
  'ngMaterial', 'ngRoute', 'PubHub', 'venueSearch', 'eventSearch'
]);

angular.
  module('searchScreen').
  component('searchScreen', {
      templateUrl: 'app/search/search-screen/search-screen.html',
      controller: 'SearchScreenController'
  });
