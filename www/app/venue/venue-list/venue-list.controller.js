angular.module('venueList')
  .controller('VenueListController', function (pubhub, $filter) {
      var $ctrl = this;

      this.sortSuburb = function (venues) {
          var sorted = $filter('orderBy')(venues, pubhub.distance)

          return sorted[0].distance;
      }

       this.addToFavourites = function (venue) {
          pubhub.addFavVenue(venue);
      }

  })
