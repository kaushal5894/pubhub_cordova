angular.module('venueList')
  .controller('VenueListController', function (pubhub, $filter, spinnerService) {
      var $ctrl = this;

      this.sortSuburb = function (venues) {
          var sorted = $filter('orderBy')(venues, pubhub.distance)

          return sorted[0].distance;
      }
      spinnerService.hideSpinner();
      this.addToFavourites = function (venue) {
          pubhub.addFavVenue(venue);
      }

  })
