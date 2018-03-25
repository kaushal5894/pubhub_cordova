angular.module('todaysOffers', [
  'ngMaterial', 'ngRoute', 'PubHub', 'slider'
]);

angular.
  module('todaysOffers').
  component('todaysOffers', {
      templateUrl: 'app/offer/todays-offers/todays-offers.html',
      controller: 'TodaysOffersController'
  });
