angular.module('navMenu')
    .service("navMenuService",
        function ($mdSidenav) {
            var me = this;

            var menuItems = [
                { name: 'Search', icon: 'magnify', path: '/search' },
                { name: 'Venues', icon: 'venues', path: '/venues' },
                { name: 'Cards', icon: 'information', path: '/todaysOffers' },
                { name: 'Offers', icon: 'offers', path: '/offers' },
                { name: 'Events', icon: 'events', path: '/events' },
                { name: 'Saved', icon: 'favourites', path: '/favourites' }
            ];

            this.getMenuItems = function () {
                return menuItems;
            };


            this.filterCategories = null;


            this.finishedCallback = null;
            this.showFilter = function (categories, changedEvent) {
                $mdSidenav('filter').open();

                categories.then(function (data) {
                    me.filterCategories = data;
                    
                })

                me.finishedCallback = changedEvent;
            }

        });
