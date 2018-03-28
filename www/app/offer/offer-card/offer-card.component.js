angular.module('offerCard', [
  'ngMaterial', 'ngRoute', 'PubHub', 'offerListItem', 'todaysOffers', 'offerList',
]);

angular.
  module('offerCard').//'todaysOffers'
  component('offerCard', {
      templateUrl: 'app/offer/offer-card/offer-card.html',
      controller: 'OfferCardController',
      bindings: {
          offer: '='
      }
  });
