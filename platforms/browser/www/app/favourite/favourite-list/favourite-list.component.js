angular.module('favouriteList', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('favouriteList').
  component('favouriteList', {
      templateUrl: 'app/favourite/favourite-list/favourite-list.html',
      controller: 'FavouriteListController'
  });
