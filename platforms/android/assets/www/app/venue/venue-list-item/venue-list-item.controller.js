angular.module('venueList')
  .controller('VenueListItemController',
        function (pubhub) {
            $ctrl = this;

            this.getLogoUrl = function (venue) {

                if (venue && venue.logoImageId) {
                    return pubhub.getImagePath(venue.logoImageId);
                } else {
                    return 'images/missing_logo.png';
                }
            }

        })
