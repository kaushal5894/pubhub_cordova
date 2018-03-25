angular.module('eventListItem')
  .controller('EventListItemController',
        function ($scope, pubhub, $mdDialog) {
            var $ctrl = this;

            this.getEventImage = function (event) {

                if (event && event.venueImageId) {
                    return pubhub.getImagePath(event.venueImageId);
                } else {
                    return 'images/missing_event_small.png';
                }
            };


            this.toggleCard = function () {
                //this.showCard = !this.showCard ;
                $mdDialog.show({
                    templateUrl: 'app/offer/offer-card/offer-card.html',
                    controller: 'OfferCardController',
                    controllerAs: '$ctrl',
                    locals: {
                        offer: $ctrl.event
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
