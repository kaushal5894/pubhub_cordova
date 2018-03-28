angular.module('offerCard')//'todaysOffers'
    .controller('OfferCardController',
        function ($scope, $http, $location, pubhub, $mdToast, $timeout, navMenuService, $mdSidenav, $routeParams) {
            var $ctrl = this;
            
            if (!$ctrl.offer) {

                pubhub.isPreview = true;

                pubhub.getOffer($routeParams.offerId).then(function (data) {
                    console.debug(data);
                    $ctrl.offer = data;
                });
            }

            if ($ctrl.offer && !$ctrl.offer.Venue) {
                pubhub.getVenue($ctrl.offer.venueId).then(function (data) {
                    $ctrl.offer.Venue = data;
                })
            }



            $scope.openVenue = function (offer) {
                if (offer.OfferId) {
                    $location.path('/venues/' + offer.venueId + '/' + 0);

                } else if (offer.EventId) {
                    $location.path('/venues/' + offer.venueId + '/' + 1);

                } else {
                    $location.path('/venues/' + offer.venueId + '/' + 1);

                }
            }

            this.getOfferUrl = function (offer) {

                var url = 'https://pubhubmediaprod.blob.core.windows.net/';

                if (offer && offer.venueImageId) {

                    url = pubhub.getImagePath(offer.venueImageId);
                } else {
                    return 'images/missing_offer_large.png';
                }

                return url;
            };

            this.getDistance = function (venue) {
                return pubhub.getDistance(venue);
            }
        });
