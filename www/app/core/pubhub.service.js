angular.module('PubHub')
.service("pubhub",
        function ($filter, $http, $q, $rootScope, $location) {
            var me = this;

            var baseURL = 'https://pubhub-api-prod.azurewebsites.net/';
            var baseURLv1 = 'https://pubhub-prod-webapi.azurewebsites.net/api/v1/';
            //var baseURL = 'http://localhost:59952';
            var currentLocation = null;
            this.mapPosition = null;


            this.register = function (email, password) {

                return $http({
                    method: 'POST',
                    url: baseURLv1 + '/authentication/register',
                    data: {
                        'email': email,
                        'password': password
                    }
                }).then(function (response) {
                    return response.data;
                })
            }


            this.login = function (email, password) {

                return $http({
                    method: 'POST',
                    url: baseURLv1 + '/authentication/login',
                    data: {
                        'email': email,
                        'password': password
                    }
                }).then(function (response) {
                    return response.data;
                })

            }

            if ($location.path() == '/landing') {
                this.isAuthenticated = false;
            } else {
                this.isAuthenticated = true;
            }


            this.isPreview = false;

            this.getVenuesForMap = function (center, cancel, features, searchText) {

                console.debug({ features: features });

                var url = baseURLv1 +
                    'venues' +
                    '?longitude=' + center.longitude +
                    '&latitude=' + center.latitude

                if (features) {
                    if (angular.isArray(features)) {

                        angular.forEach(features, function (value, key) {
                            url += "&features=" + value
                        });
                    } else {
                        url += "&features=" + features
                    }

                }

                if (searchText) {
                    url += "&q=" + searchText
                }

                return $http({
                    method: 'GET',
                    timeout: cancel,
                    url: url,
                    withCredentials: true
                }).then(function successCallback(response) {

                    return response.data;
                },
                    function errorCallback(response) {

                        console.debug(response);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

            }


            this.getFavVenues = function () {

                return getCurrentLocation().then(
                    function (currentLocation) {

                        var url = baseURLv1 +
                          'customer/favouriteVenues' +
                          '?longitude=' + currentLocation.longitude +
                           '&latitude=' + currentLocation.latitude

                        return $http({
                            method: 'GET',
                            url: url,
                            withCredentials: true
                        }).then(function successCallback(response) {
                            return response.data;
                        },
                         function errorCallback(response) {

                             console.debug(response);
                             // called asynchronously if an error occurs
                             // or server returns response with an error status.
                         });

                    });

            }

            this.addFavVenue = function (venue) {

                var url = baseURLv1 +
                    'customer/favouriteVenues/' +
                    venue.venueId;

                $http({
                    method: 'PUT',
                    url: url,
                    withCredentials: true
                }).then(function successCallback(response) {

                    return response.data;
                },
                 function errorCallback(response) {

                     console.debug(response);
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 });

            };

            this.deleteFavVenue = function (venue) {

                var url = baseURLv1 +
                    'customer/favouriteVenues/' +
                    venue.venueId;

                $http({
                    method: 'DELETE',
                    url: url,
                    withCredentials: true
                }).then(function successCallback(response) {
                    return response.data;
                },
                 function errorCallback(response) {

                     console.debug(response);
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 });

            };

            this.getVenue = function (id) {

                return getCurrentLocation().then(
                    function (currentLocation) {

                        var url = baseURLv1 +
                           'venues/' +
                           id +
                           '?longitude=' + currentLocation.longitude +
                           '&latitude=' + currentLocation.latitude

                        return $http({
                            method: 'GET',
                            url: url,
                            withCredentials: true
                        }).then(function successCallback(response) {

                            var venue = response.data;

                            angular.forEach(venue.offers, function (value, key) {
                                value.venue = venue;
                            })

                            angular.forEach(venue.events, function (value, key) {
                                value.venue = venue;
                            })

                            return venue;
                        },
                            function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });

                    });

            }


            this.getFavOffers = function () {

                return getCurrentLocation().then(
                    function (currentLocation) {

                        var url = baseURLv1 +
                            'customer/favouriteOffers' +
                            '?longitude=' + currentLocation.longitude +
                             '&latitude=' + currentLocation.latitude

                        return $http({
                            method: 'GET',
                            url: url,
                            withCredentials: true
                        }).then(function successCallback(response) {
                            return response.data;
                        },
                         function errorCallback(response) {

                             console.debug(response);
                             // called asynchronously if an error occurs
                             // or server returns response with an error status.
                         });

                    });
            }

            this.addFavOffer = function (offer) {

                var url = baseURLv1 +
                    'customer/favouriteOffers/' +
                    offer.offerId;

                $http({
                    method: 'PUT',
                    url: url,
                    withCredentials: true
                }).then(function successCallback(response) {
                    return response.data;
                },
                 function errorCallback(response) {

                     console.debug(response);
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 });

            };

            this.deleteFavOffer = function (offer) {

                var url = baseURLv1 +
                    'customer/favouriteOffers/' +
                    offer.offerId;

                $http({
                    method: 'DELETE',
                    url: url,
                    withCredentials: true
                }).then(function successCallback(response) {
                    return response.data;
                },
                 function errorCallback(response) {

                     console.debug(response);
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 });

            };

            this.onOffersChanged = function (callback) {
                $rootScope.$on('PubHub.OffersChanged', callback);
            }

            this.offersChanged = function () {
                $rootScope.$emit('PubHub.OffersChanged');
            }

            this.getOffer = function (offerId) {
                return getCurrentLocation().then(
                    function (currentLocation) {

                        var url = baseURLv1 +
                                "/Offers/" + offerId +
                                 '?longitude=' + currentLocation.longitude +
                                '&latitude=' + currentLocation.latitude


                        return $http({
                            method: 'GET',
                            url: url,
                            withCredentials: true
                        }).then(function successCallback(response) {

                            return response.data;

                        },
                            function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });

                    });
            }

            this.getOffersByDay = function (day, searchText) {
                return getCurrentLocation().then(
                    function (currentLocation) {

                        var url = baseURLv1 +
                                "/Offers" +
                                 '?longitude=' + currentLocation.longitude +
                                '&latitude=' + currentLocation.latitude +
                                '&dayOfWeek=' + day.filter

                        if (searchText) {
                            url += '&q=' + searchText;
                        }

                        if (offerCategories) {

                            var selectedCats = $filter('filter')(offerCategories, { selected: true });

                            if (selectedCats.length) {

                                angular.forEach(selectedCats, function (value, key) {
                                    var selectedSubCats = $filter('filter')(value.OfferSubcategories, { selected: true });

                                    if (selectedSubCats.length) {

                                        angular.forEach(selectedSubCats, function (value2, key2) {
                                            url += '&subCategories=' + value2.OfferSubcategoryId

                                        });


                                    } else {
                                        // We don't have any selected, so select them all
                                        angular.forEach(value.OfferSubcategories, function (value2, key2) {
                                            url += '&subCategories=' + value2.OfferSubcategoryId

                                        });
                                    }

                                });

                                url += ")"

                            }

                        }

                        if (features) {
                            var selectedFeatures = $filter('filter')(features, { selected: true });

                            if (selectedFeatures.length) {

                                angular.forEach(selectedFeatures, function (value, key) {

                                    url += "&features=" + value.FeatureId;

                                });
                            }

                        }

                        return $http({
                            method: 'GET',
                            url: url,
                            withCredentials: true
                        }).then(function successCallback(response) {

                            return response.data;

                        },
                            function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });

                    });
            }

            this.getTodaysOffers = function (day) {

                return getCurrentLocation().then(
                    function (currentLocation) {
                        var url = baseURLv1 +
                                "/WhatsOn" +
                                '?longitude=' + currentLocation.longitude +
                                '&latitude=' + currentLocation.latitude +
                                '&dayOfWeek=' + day.name

                        //url = getOfferFilter(url);

                        //url += "&$top=" + top +
                        //        "&$skip=" + skip;

                        return $http({
                            method: 'GET',
                            url: url

                        }).then(function successCallback(response) {

                            var data = _.map(response.data, function (value) {

                                var obj = value.event || value.offer;

                                obj.venue = value.venue;

                                obj.whatsOnType = value.whatsOnType.toLowerCase();
                                obj.whatsOnId = value.whatsOnType + (obj.eventId || obj.offerId);

                                return obj;

                            })

                            return data;

                        },
                            function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                    });
            }

            function getOfferFilter(url) {
                if (offerCategories) {

                    var selectedCats = $filter('filter')(offerCategories, { selected: true });

                    if (selectedCats.length) {

                        url += " and ("
                        angular.forEach(selectedCats, function (value, key) {
                            if (key > 0) url += ' or';

                            var selectedSubCats = $filter('filter')(value.OfferSubcategories, { selected: true });

                            if (selectedSubCats.length) {

                                angular.forEach(selectedSubCats, function (value2, key2) {
                                    url += ' OfferSubcategoryId eq ' + value2.OfferSubcategoryId

                                });


                            } else {
                                url += ' OfferSubcategory/OfferCategoryId eq ' + value.OfferCategoryId
                            }

                        });

                        url += ")"

                    }

                }

                if (features) {
                    var selectedFeatures = $filter('filter')(features, { selected: true });

                    if (selectedFeatures.length) {

                        angular.forEach(selectedFeatures, function (value, key) {

                            url += " and Venue/Features/any(f:f/FeatureId eq " + value.FeatureId + ")";

                        });
                    }

                }

                return url;
            }

            this.getFavEvents = function () {
                return getCurrentLocation().then(
                    function (currentLocation) {
                        var url = baseURLv1 +
                            'customer/favouriteEvents' +
                            '?longitude=' + currentLocation.longitude +
                             '&latitude=' + currentLocation.latitude

                        return $http({
                            method: 'GET',
                            url: url,
                            withCredentials: true
                        }).then(function successCallback(response) {
                            return response.data;
                        },
                         function errorCallback(response) {

                             console.debug(response);
                             // called asynchronously if an error occurs
                             // or server returns response with an error status.
                         });

                    });

            }

            this.addFavEvent = function (event) {

                var url = baseURLv1 +
                    'customer/favouriteEvents/' +
                    event.eventId;

                $http({
                    method: 'PUT',
                    url: url,
                    withCredentials: true
                }).then(function successCallback(response) {
                    return response.data;
                },
                 function errorCallback(response) {

                     console.debug(response);
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 });

            };

            this.deleteFavEvent = function (event) {

                var url = baseURLv1 +
                    'customer/favouriteEvents/' +
                    event.eventId;

                $http({
                    method: 'DELETE',
                    url: url,
                    withCredentials: true
                }).then(function successCallback(response) {
                    return response.data;
                },
                 function errorCallback(response) {

                     console.debug(response);
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 });

            };


            this.onEventsChanged = function (callback) {
                $rootScope.$on('PubHub.EventsChanged', callback);
            }

            this.eventsChanged = function () {
                $rootScope.$emit('PubHub.EventsChanged');
            }

            this.getEventsByMonth = function (month, searchText) {

                return getCurrentLocation().then(
                    function (currentLocation) {

                        var url = baseURLv1 +
                                "/events" +
                                '?longitude=' + currentLocation.longitude +
                                '&latitude=' + currentLocation.latitude +
                                '&month=' + (month.startDate.getMonth() + 1) +
                                '&year=' + month.startDate.getFullYear();

                        if (searchText) {
                            url += '&q=' + searchText;
                        }

                        if (eventCategories) {

                            var selectedCats = $filter('filter')(eventCategories, { selected: true });

                            if (selectedCats.length) {

                                angular.forEach(selectedCats, function (value, key) {
                                    var selectedSubCats = $filter('filter')(value.EventSubcategories, { selected: true });

                                    if (selectedSubCats.length) {

                                        angular.forEach(selectedSubCats, function (value2, key2) {
                                            url += '&subCategories=' + value2.EventSubcategoryId

                                        });


                                    } else {
                                        angular.forEach(value.EventSubcategories, function (value2, key2) {
                                            url += '&subCategories=' + value2.EventSubcategoryId

                                        });
                                    }

                                });

                                url += ")"

                            }

                        }

                        if (features) {
                            var selectedFeatures = $filter('filter')(features, { selected: true });

                            if (selectedFeatures.length) {

                                angular.forEach(selectedFeatures, function (value, key) {

                                    url += "features=" + value.FeatureId + ")";

                                });
                            }

                        }

                        return $http({
                            method: 'GET',
                            url: url,
                            withCredentials: true
                        }).then(function successCallback(response) {

                            return response.data;

                        },
                            function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                    })
            }

            var features = null;
            this.getFeatures = function () {

                if (features) {
                    return $q.when(features);
                }

                return $http({
                    method: 'GET',
                    url: baseURL +
                        "/Features "
                }).then(function successCallback(response) {

                    features = response.data.value
                    return features;

                },
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

            };

            var eventCategories = null;
            this.getEventCategories = function () {

                if (eventCategories) {
                    return $q.when(eventCategories);
                }

                return $http({
                    method: 'GET',
                    url: baseURL +
                        "/EventCategories?$expand=EventSubcategories"
                }).then(function successCallback(response) {
                    eventCategories = response.data.value;
                    return eventCategories;
                },
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

            }

            var offerCategories = null;
            this.getOfferCategories = function () {

                if (offerCategories) {
                    return $q.when(offerCategories);
                }

                return $http({
                    method: 'GET',
                    url: /*"http://pubhub-prod-webapi.azurewebsites.net/api/v1/whatson?longitude=151.20567&latitude=-33.8404"*/baseURL +
                        "/OfferCategories?$expand=OfferSubcategories"
                    //"api/v1/whatson?longitude=151.20567&latitude=-33.8404"
                }).then(function successCallback(response) {
                    offerCategories = response.data.value;
                    return offerCategories;

                },
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

            }


            this.getDays = function () {
                return $q.when([
                        { day: 1, name: 'Mondays', field: 'onMonday', filter: 'Monday' },
                        { day: 2, name: 'Tuesdays', field: 'onTuesday', filter: 'Tuesday' },
                        { day: 3, name: 'Wednesdays', field: 'onWednesday', filter: 'Wednesday' },
                        { day: 4, name: 'Thursdays', field: 'onThursday', filter: 'Thursday' },
                        { day: 5, name: 'Fridays', field: 'onFriday', filter: 'Friday' },
                        { day: 6, name: 'Saturdays', field: 'onSaturday', filter: 'Saturday' },
                        { day: 7, name: 'Sundays', field: 'onSunday', filter: 'Sunday' }
                ]
                )
            }

            this.getMonths = function () {

                var MonthNames = [
                    'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                    'November', 'December'
                ];

                var months = [];
                for (var i = 0; i <= 11; i++) {
                    var year = new Date().getFullYear();

                    if (new Date().getMonth() > i) {
                        year++;
                    }

                    var month = {
                        month: i + 1,
                        name: MonthNames[i] + ' ' + year,
                        startDate: new Date(Date.UTC(year, i, 1)),
                        endDate: new Date(Date.UTC(year, i + 1, 1))
                    };

                    if (new Date().getMonth() == i) {
                        month.startDate = new Date();
                    }

                    months.push(month)

                }

                return $q.when(months);

            }


            function getCurrentLocation() {

                if (me.mapPosition) {
                    return $q.when(me.mapPosition.center)
                }

                if (currentLocation) {
                    return $q.when(currentLocation);
                }

                return $q(function (resolve, reject) {
                    if (navigator.geolocation) {
                        var location_timeout = setTimeout("geolocFail()", 10000);
                        navigator.geolocation.getCurrentPosition(function (position) {
                            //var lat = position.coords.latitude;
                            //var lng = position.coords.longitude;
                            //$rootScope.lat = lat;
                            //$rootScope.lng = lng;
                            //alert('lat :' + lat + ' lng :' + lng);
                            resolve(position.coords);

                        },
                            function () {
                                clearTimeout(location_timeout);
                                alert('Failed to get GPS Coordinates');
                                reject('Failed to get GPS Coordinates')
                            },
                            { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
                        );
                    } else {
                        alert('GPS Not Available');
                        reject('GPS Not Available');
                    }
                    // var posOptions = {timeout: 10000, enableHighAccuracy: true};
                    // return $cordovaGeolocation
                    // .getCurrentPosition(posOptions)
                    // .then(function (position) {
                    //     var lat  = position.coords.latitude
                    //     var long = position.coords.longitude
                    //     console.log(lat, long);
                    //     // resolve(position.coords);
                    //     return position.coords;clear
                    // }, function(err) {
                    //     // error
                    //     console.log("Error ===> " + JSON.stringify(err));
                    //     alert('Failed to get GPS Coordinates');
                    //     // reject('Failed to get GPS Coordinates')
                    // });
                });
            }

            if (window.cordova) {
                document.addEventListener("deviceready",
                    function () {
                        getCurrentLocation().then(function (data) {
                            currentLocation = data;
                        });
                    },
                    false);

            } else {
                getCurrentLocation().then(function (data) {
                    currentLocation = data;
                });
            }

            this.getDistance = function (venue) {
                if (!venue) {
                    return 0;
                }

                if (!currentLocation) {
                    console.debug('No location available');
                    return NaN;
                }

                var distance = getDistanceFromLatLonInKm(venue.latitude,
                    venue.Longitude,
                    currentLocation.latitude,
                    currentLocation.longitude);

                return distance;
            }

            function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
                var R = 6371; // Radius of the earth in km
                var dLat = deg2rad(lat2 - lat1); // deg2rad below
                var dLon = deg2rad(lon2 - lon1);
                var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(deg2rad(lat1)) *
                        Math.cos(deg2rad(lat2)) *
                        Math.sin(dLon / 2) *
                        Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; // Distance in km
                return d;
            }

            function deg2rad(deg) {
                return deg * (Math.PI / 180)
            }


            this.getImagePath = function (imageGuid) {

                //return 'https://pubhubmediaprod.blob.core.windows.net/testcontainer/' + imageGuid;
                return 'https://pubhubmediaprod.blob.core.windows.net/venueimages/' + imageGuid + '.png';

            }

            this.getWhatsOnForCards = function () {
                return getCurrentLocation().then(
                    function (currentLocation) {
                        var url = baseURLv1 +
                                "/WhatsOn" +
                                '?longitude=' + currentLocation.longitude +
                                '&latitude=' + currentLocation.latitude
                        //url = getOfferFilter(url);

                        //url += "&$top=" + top +
                        //        "&$skip=" + skip;

                        return $http({
                            method: 'GET',
                            url: url

                        }).then(function successCallback(response) {

                            var data = _.map(response.data, function (value) {

                                var obj = value.event || value.offer;

                                obj.venue = value.venue;

                                obj.whatsOnType = value.whatsOnType.toLowerCase();
                                obj.whatsOnId = value.whatsOnType + (obj.eventId || obj.offerId);

                                return obj;

                            })

                            return data;

                        },
                            function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                    });
            }
            this.getVenuesList = function (features) {
                return getCurrentLocation().then(
                    function (currentLocation) {
                        var url = baseURLv1 +
                            'venues' +
                             '?longitude=' + currentLocation.longitude +
                             '&latitude=' + currentLocation.latitude

                        if (features != undefined && features != '' && features != null) {
                            url += features;
                        }
                        //url = getOfferFilter(url);

                        //url += "&$top=" + top +
                        //        "&$skip=" + skip;

                        return $http({
                            method: 'GET',
                            url: url

                        }).then(function successCallback(response) {
                            return response.data;
                        },
                            function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                    });
            }

        })


//this.getVenuesList =function(){
//    return getCurrentLocation().then(
//        function (currentLocation) {                    

//        var url = baseURLv1 +
//            'venues' +
//            '?longitude=' +currentLocation.longitude +
//            '&latitude=' + currentLocation.latitude

//        return $http({
//            method: 'GET',                        
//            url: url                        
//        }).then(function successCallback(response) {

//            return response.data;
//        },
//            function errorCallback(response) {

//                console.debug(response);
//                // called asynchronously if an error occurs
//                // or server returns response with an error status.
//            });

//    });
//}
