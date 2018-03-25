angular.module('venueDetail')
    .controller('VenueDetailController',
        function ($scope, $http, pubhub, $routeParams, $filter) {

            pubhub.getVenue($routeParams.venueID)
                .then(function (data) {
                    $scope.venue = data;
                    $scope.carouselImages = data.CarouselImages;
                }
            );

            $scope.carouselImages = [];

            $scope.currentTab = $routeParams.tab || 2;

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

            $scope.tabImage = function (image, tab) {
                return 'images/tabs/' + image + ($scope.currentTab === tab ? '' : '') + '.png';
            }

            $scope.getDayOffers = function (venue, day) {
                if (!venue) {
                    return;
                }

                if (!day.offers) {

                    var filter = $filter('filter');

                    var param = {};

                    param[day.field] = true;

                    var offers = filter(venue.offers, param);

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

            $scope.getMonthEvents = function (venue, month) {


                if (!venue) {
                    return;
                }

                if (!month.events) {

                    month.events = [];

                    filter = $filter('filter');

                    var events = filter(venue.events, function (actual, expected) {

                        var actualDate = new Date(actual.date)

                        return actualDate >= month.startDate && actualDate <= month.endDate;
                    });

                    month.events = events;
                    //pubhub.getEventsByVenue($routeParams.venueID, month).then(function(data) {
                    //    month.events = data;
                    //})
                }

                return month.events;

            }

            $scope.getImages = function (venue) {

                if (!venue) {
                    return null;
                }

                if (!venue.images) {
                    venue.images = [
                        'sample/venues/images/' + venue.VenueId + '_1.jpg',
                        'sample/venues/images/' + venue.VenueId + '_2.jpg',
                        'sample/venues/images/' + venue.VenueId + '_3.jpg'
                    ]
                }

                return venue.images;
            }

            this.getCarouselImage = function (img) {
                if (img && img.id) {
                    return pubhub.getImagePath(img.id);
                } else {
                    return null;
                }
            }

            this.getLogoUrl = function (venue) {

                if (venue && venue.logoImageId) {
                    return pubhub.getImagePath(venue.logoImageId);
                } else {
                    return 'images/missing_logo.png';
                }
            };

            this.NavigateToVenue = function (venue) {

                if (!window.cordova) {
                    alert('Navigation unavailable');
                    return;
                }

                launchnavigator.navigate([venue.latitude, venue.longitude]);

            }

        });
