angular.module('venueMap')
  .controller('VenueMapController',
        function ($scope, uiGmapGoogleMapApi, pubhub, uiGmapIsReady, $filter, $timeout, $q, $location, spinnerService) {
            var $ctrl = this;
            var cancelGet = $q.defer();

            var isInitialLoad = true;
            var gMap = null;


            spinnerService.showSpinner();

            function initMap() {
                $scope.map = {
                    center: pubhub.mapPosition.center,
                    zoom: pubhub.mapPosition.zoom,
                    control: {},
                    markers: [],
                    events: {
                        'bounds_changed': function (map, eventName, args) {
                            cancelGet.resolve();

                            cancelGet = $q.defer();

                            var features = $location.search().feature;

                            pubhub.mapPosition = {
                                center: {
                                    latitude: map.center.lat(),
                                    longitude: map.center.lng()
                                },
                                zoom: map.zoom
                            }

                            var searchText = $location.search().q;

                            pubhub.getVenuesForMap(pubhub.mapPosition.center, cancelGet.promise, features, searchText).then(function (data) {
                            
                                if (!data) {
                                    console.log('Search cancelled');
                                    return;

                                }


                                if (isInitialLoad) {
                                    spinnerService.hideSpinner();
                                }

                                if (!data.length) {
                                    console.log('No data found');

                                    $ctrl.venues = [];
                                    //if (isInitialLoad) {
                                    //    $scope.map.zoom--;
                                    //    if ($scope.map.zoom < 5) {
                                    //        $ctrl.venues = data;
                                    //        isInitialLoad = false;

                                    //    }
                                    //}

                                    return;
                                }


                                isInitialLoad = false;

                                $ctrl.venues = data;

                                var map = $filter('map');

                                //centering map http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers


                                $scope.markers = map(
                                    data,
                                    function (val) {
                                        return {
                                            id: val.venueId,
                                            VenueId: val.venueId,
                                            location: {
                                                latitude: val.latitude,
                                                longitude: val.longitude
                                            },
                                            DisplayName: val.displayName,
                                            Suburb: val.suburb,
                                            Address1: val.address1,
                                            pinIcon: 'images/pin.png',
                                            LogoImageId: val.logoImageId
                                        }
                                    });
                            });
                        },
                        'click': function (map, eventName, args) {
                            $scope.selectedVenue = null;
                            $scope.$apply();
                        },
                        'tilesloaded': function (map) {
                            gMap = map;
                        }
                    }
                };

                $scope.markers = [];

            }

            // Try HTML5 geolocation.
            if (pubhub.mapPosition) {
                console.log('using previous pos');

                initMap();
            }
            else if (navigator.geolocation) {
                console.log('getting new pos');

                navigator.geolocation.getCurrentPosition(function (position) {

                    pubhub.mapPosition = {
                        center: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        },
                        zoom: 14
                    }
                    initMap();

                },
                function () {
                    pubhub.mapPosition = {
                        center: {
                            latitude: -33.8051727,
                            longitude: 151.1781269
                        },
                        zoom: 16
                    }
                    initMap();

                });
            } else {
                console.log('using default pos');

                // Browser doesn't support Geolocation
                pubhub.mapPosition = {
                    center: {
                        latitude: -33.8051727,
                        longitude: 151.1781269
                    },
                    zoom: 16
                }

                initMap();

            }

            uiGmapIsReady.promise(1).then(function (instances) {

                $timeout(function () {
                    //console.debug($scope.map.control);
                },
                    100);

            });




            $scope.onClick = function (marker, e, venue) {
                $scope.selectedVenue = venue;

                gMap.panTo({lat: venue.location.latitude, lng: venue.location.longitude});
            };

            this.getLogoUrl = function (venue) {

                if (venue && venue.LogoImageId) {
                    return pubhub.getImagePath(venue.LogoImageId);
                } else {
                    return 'images/missing_logo.png';
                }
            };


        })
