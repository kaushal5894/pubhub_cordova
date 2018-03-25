angular.module('offerListItem', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('offerListItem').
  component('offerListItem', {
      templateUrl: 'app/offer/offer-list-item/offer-list-item.html',
      controller: 'OfferListItemController',
      bindings: {
          offer: '=',
          swipeIcon: '@',
          swipeText: '@',
          swipeAction: '&'
      }
  });
