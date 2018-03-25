angular.module('navMenu')
  .controller('NavMenuController',
        function($scope, $http, $location, $mdSidenav, navMenuService, pubhub, $route, $filter) {

            $scope.menuItems = navMenuService.getMenuItems();

            $scope.open = function() {
                $mdSidenav('leftNav').open();
            }

            $scope.close = function() {
                $mdSidenav('leftNav').close();
            }

            $scope.showNav = function() {
                return pubhub.isAuthenticated && !pubhub.isPreview;
            }

            $scope.showPreview = function () {
                return pubhub.isPreview;
            }

            $scope.pageTitle = function() {
                return $route.current.title;
            }

            $scope.closeFilter = function(filter) {
                $mdSidenav(filter).close();
                navMenuService.finishedCallback();
            }

            $scope.navigate = function(item) {
                $location.path(item.path);
                $mdSidenav('leftNav').close();
            }


            pubhub.getFeatures().then(function(data) {
                $scope.features = data;
            });

            //$scope.eventCategories = [];
            //$scope.offerCategories = [];

            //pubhub.getEventCategories().then(function(data) {
            //    $scope.eventCategories = data;
            //});

            //pubhub.getOfferCategories().then(function(data) {
            //    $scope.offerCategories = data;
            //});

            //$scope.categories = function () {
            //    return _.union($scope.eventCategories, $scope.offerCategories);
            //}

            $scope.filterCategories = function () {
                return navMenuService.filterCategories;
            };

            $scope.subCategories = function () {
                var selectedOfferCats = $filter('filter')($scope.filterCategories(), { selected: true });

                var subOfferCats = _.flatMap(selectedOfferCats, 'OfferSubcategories');
                var subEventCats = _.flatMap(selectedOfferCats, 'EventSubcategories');

                var subCats = _.union(subEventCats, subOfferCats);
                return subCats;
            }

            //$scope.subCategories = function () {

            //    var selectedOfferCats = $filter('filter')($scope.offerCategories, { selected: true });
            //    var selectedEventCats = $filter('filter')($scope.eventCategories, { selected: true });

            //    var subEventCats = _.flatMap(selectedOfferCats, 'OfferSubcategories');
            //    var subOfferCats = _.flatMap(selectedEventCats, 'EventSubcategories');

            //    var subCats = _.union(subEventCats, subOfferCats);
            //    return subCats;

            //};

        })
