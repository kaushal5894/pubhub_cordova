angular.
  module('todaysOffers').
  component('offerCard', {
      templateUrl: 'app/offer/offer-card/offer-card.html',
      controller: 'OfferCardController',
      bindings: {
          offer: '@'
      }
  });
