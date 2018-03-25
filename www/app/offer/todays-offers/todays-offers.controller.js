

angular.module('todaysOffers')
    .controller('FilterModalController',
        function ($scope, $http, $location, pubhub, $mdToast, $timeout, $mdDialog) {

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        var categories = pubhub.getOfferCategories();
        categories.then(function(data){
            console.log(data)
            $scope.categories = [];
            data.forEach(function(d){
              $scope.categories.push({
                'OfferCategoryId': d.OfferCategoryId, 
                'DisplayName': d.DisplayName,
                'isSelected': false
              });
            });     
        });

        $scope.selCategory = function(indx){  
            if($scope.categories[indx]['isSelected']){
              $scope.categories[indx]['isSelected'] = false;  
            }else{
              $scope.categories[indx]['isSelected'] = true;  
            }
        }

        $scope.search = function(){
            console.log("Search");
        };

    })
    .controller('TodaysOffersController',
        function ($scope, $http, $location, pubhub, $mdToast, $timeout, navMenuService, $mdSidenav, $filter, $mdDialog) {

            $scope.openVenue = function (offer) {
                $location.path('/venues/' + offer.VenueId + '/' + 0);
            }

           

            $scope.addFavourite = function (offer) {
                //var pinTo = {
                //    top: false,
                //    bottom: true,
                //    right: true,
                //    left: false
                //}
                //var toast = $mdToast.simple()
                //    .textContent('Added to Favourites')
                //    .action('UNDO')
                //    .highlightAction(true)
                //    .position(pinTo);
                //$mdToast.show(toast).then(function (response) {
                //    if (response == 'ok') {
                //        //alert('You clicked the \'UNDO\' action.');
                //    }
                //});

                switch (offer.whatsOnType) {
                    case 'event':
                        pubhub.addFavEvent(offer);
                        break;

                    case 'offer':
                        pubhub.addFavOffer(offer);
                        break;

                }

                $scope.skip(offer);

            };


            $scope.dislike = function (offer) {
                //var pinTo = {
                //    top: false,
                //    bottom: true,
                //    right: true,
                //    left: false
                //}
                //var toast = $mdToast.simple()
                //    .textContent('Less of this')
                //    .action('UNDO')
                //    .highlightAction(true)
                //    .position(pinTo);
                //$mdToast.show(toast).then(function (response) {
                //    if (response == 'ok') {
                //        //alert('You clicked the \'UNDO\' action.');
                //    }
                //});

                $scope.skip(offer);

            };


            $scope.skipStart = function (offer) {
                $scope.skipping = true;
            }

            $scope.skip = function (offer) {
                $scope.skipping = false;

                offer.skipped = true;

            }

            function getTodaysOffers(selectedDay, refresh) {
                var day = $scope.days[selectedDay - 1];

                if (!day.data || refresh) {

                    pubhub.getTodaysOffers(day).then(function (data) {
                        day.data = data;
                    });
                }
            }

            this.filterOffers = function (day) {
                if (day.data) {
                    var limitTo = $filter('limitTo');
                    var filter = $filter('filter');

                    var data = day.data;
                    data = filter(data, function (actual, expected) {
                        return !actual.skipped
                    })

                    data = limitTo(data, 3);

                    return data;
                }
            }

            $scope.$watch('selectedDay',
                function (newVal, oldVal) {

                    getTodaysOffers(newVal);

                });

            pubhub.onOffersChanged(function () {
                getTodaysOffers($scope.selectedDay, true);
            });

            $scope.selectedDay = new Date().getDay() || 7;

            $scope.days = [
                { day: 1, name: 'Mondays', field: 'OnMonday' },
                { day: 2, name: 'Tuesdays', field: 'OnTuesday' },
                { day: 3, name: 'Wednesdays', field: 'OnWednesday' },
                { day: 4, name: 'Thursdays', field: 'OnThursday' },
                { day: 5, name: 'Fridays', field: 'OnFriday' },
                { day: 6, name: 'Saturdays', field: 'OnSaturday' },
                { day: 7, name: 'Sundays', field: 'OnSunday' }
            ];

            $scope.isNextLeft = function (selectedDay, day) {
                if (selectedDay <= 3 && day >= 5) {
                    return true;
                } else if (selectedDay >= 5 && day <= 3) {
                    return false;
                } else if (selectedDay > day) {
                    return true;
                }

                return false;
            }

            $scope.isNextRight = function (selectedDay, day) {
                if (selectedDay >= 5 && day <= 3) {
                    return true;
                } else if (selectedDay <= 3 && day >= 5) {
                    return false
                } else if (selectedDay < day) {
                    return true;
                }

                return false;
            }

            $scope.nextDay = function () {
                $scope.selectedDay++;

                if ($scope.selectedDay > 7) $scope.selectedDay = 1;

            }

            $scope.prevDay = function () {
                $scope.selectedDay--;

                if ($scope.selectedDay < 1) $scope.selectedDay = 7;

            }

            $scope.openFilter = function (ev) {

                $mdDialog.show({
                  controller: 'FilterModalController',
                  templateUrl: 'app/offer/todays-offers/filter-modal.tmpl.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  fullscreen: 'sm'
                })
                .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                  $scope.status = 'You cancelled the dialog.';
                });
                $scope.$watch(function() {
                    //
                }, function(wantsFullScreen) {
                    //
                });
            }

            /*Before Code*/
            /*
            $scope.openFilter = function () {

                navMenuService.showFilter(
                    pubhub.getOfferCategories(),
                    pubhub.offersChanged
              );
            }*/
        });
