angular.module('offerListItem')
  .controller('OfferListItemController', function ($scope, pubhub, $mdDialog) {
      var $ctrl = this;

      this.getOfferImage = function (offer) {

          if (offer && offer.venueImageId) {
              return pubhub.getImagePath(offer.venueImageId);
          } else {
              return 'images/missing_offer_small.png';
          }
      };


      this.toggleCard = function () {
          //this.showCard = !this.showCard ;
          $mdDialog.show({
              templateUrl: 'app/offer/offer-card/offer-card.html',
              controller: 'OfferCardController',
              controllerAs: '$ctrl',
              locals: {
                  offer: $ctrl.offer
              },
              bindToController: true,
              parent: angular.element(document.body),
              clickOutsideToClose: true
          });
      }

      $scope.$on('$locationChangeStart', function () {
          $mdDialog.hide();
      })

  })
