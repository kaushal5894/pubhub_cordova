angular.module('offerList', [
  'ngMaterial', 'ngRoute', 'PubHub', 'offerListItem', 'todaysOffers'
]);

angular.
  module('offerList').
  component('offerList', {
      templateUrl: 'app/offer/offer-list/offer-list.html',
      controller: 'OfferListController'
  });
