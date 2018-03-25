angular.module('offerList')
  .controller('OfferListController', function ($scope, $http, pubhub, $routeParams, navMenuService, $mdSidenav, $timeout, spinnerService, $q, $location) {

      var filter;
      $scope.isShowFilter = false;

      var searchText = $location.search().q;

      var categories = pubhub.getOfferCategories();
      categories.then(function(data){
        $scope.categories = [];
        data.forEach(function(d){
          $scope.categories.push({
            'EventCategoryId': d.EventCategoryId, 
            'DisplayName': d.DisplayName,
            'isSelected': false
          });
        }); 
      });

      if ($routeParams.venueID) {
          filter = $routeParams.venueID;
      }

      function getOffersByDay(day, refresh) {
          var dayObj = $scope.days[day - 1];

          if (!dayObj.data || refresh) {

              return pubhub.getOffersByDay(dayObj, searchText).then(function (data) {
                  dayObj.data = data;
              });
          } else {
              return $q.when();
          }
      }

      $scope.$watch('selectedDay',
          function (newVal, oldVal) {

              spinnerService.showSpinner();

              getOffersByDay(newVal)
                  .then(function () { spinnerService.hideSpinner(); });

              $timeout(function () {
                  getOffersByDay(nextDay(newVal));
                  getOffersByDay(prevDay(newVal));
              }, 1000)

          });


      pubhub.onOffersChanged(function () {
          getOffersByDay($scope.selectedDay, true);

      });


      $scope.selectedDay = new Date().getDay() || 7;



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

      function nextDay(day) {
          day++;

          if (day > 7) day = 1;

          return day;
      }

      $scope.nextDay = function () {
          $scope.selectedDay = nextDay($scope.selectedDay);
      }

      function prevDay(day) {
          day--;

          if (day < 1) day = 7;

          return day;
      }
      $scope.prevDay = function () {
          $scope.selectedDay = prevDay($scope.selectedDay);
      }

      /* Before Code
      $scope.openFilter = function () {

          navMenuService.showFilter(
              pubhub.getOfferCategories(),
              pubhub.offersChanged
        );
      }*/

      $scope.openFilter = function () {         
        $scope.isShowFilter = ($scope.isShowFilter) ? false : true;
      }

      $scope.selCategory = function(indx){        
        if($scope.categories[indx]['isSelected']){
          $scope.categories[indx]['isSelected'] = false;  
        }else{
          $scope.categories[indx]['isSelected'] = true;  
        }
      }

      pubhub.getDays().then(function (data) {
          $scope.days = data;
      })

      $scope.addToFavourites = function (offer) {
          pubhub.addFavOffer(offer);
      }


  })
