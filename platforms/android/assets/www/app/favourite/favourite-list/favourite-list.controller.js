angular.module('favouriteList')
  .controller('FavouriteListController', function ($scope, pubhub, $timeout, $filter) {
      var $ctrl = this;

      $scope.currentTab = 0;

      $scope.nextTab = function () {
          if ($scope.currentTab <= 2) {
              $scope.currentTab++;
          }
      }

      $scope.previousTab = function () {
          if ($scope.currentTab > 0) {
              $scope.currentTab--;
          }
      }

      this.venues = null;
      this.offers = null;
      this.events = null;

      pubhub.getFavVenues()
          .then(function (data) {
              $ctrl.venues = data;
          });

      pubhub.getFavOffers().
          then(function (data) {
              $ctrl.offers = data;
          });

      pubhub.getFavEvents()
          .then(function (data) {
              $ctrl.events = data;
          })

      $scope.getDayOffers = function (day) {
          if (!$ctrl.offers) {
              return;
          }

          if (!day.offers) {

              var filter = $filter('filter');

              var param = {};

              param[day.field] = true;

              var offers = filter($ctrl.offers, param);

              day.offers = offers;
          }

          return day.offers;

      }

      pubhub.getDays().then(function (data) {
          $scope.days = data;
      })


      pubhub.getMonths().then(function (data) {
          $scope.months = data;
      })

      $scope.getMonthEvents = function (month) {


          if (!$ctrl.events) {
              return;
          }

          if (!month.events) {

              month.events = [];

              filter = $filter('filter');

              var events = filter($ctrl.events, function (actual, expected) {

                  var actualDate = new Date(actual.date)

                  return actualDate >= month.startDate && actualDate < month.endDate;
              });

              month.events = events;

          }

          return month.events;

      }

      this.sortSuburb = function (venues) {
          var sorted = $filter('orderBy')(venues, pubhub.distance)

          return sorted[0].distance;
      }


      $ctrl.deleteEventFromFavourites = function (event) {
          pubhub.deleteFavEvent(event);

      }

      $ctrl.deleteOfferFromFavourites = function (offer) {
          pubhub.deleteFavOffer(offer);
      }

      $ctrl.deleteVenueFromFavourites = function (venue) {
          pubhub.deleteFavVenue(venue);
      }

  })
