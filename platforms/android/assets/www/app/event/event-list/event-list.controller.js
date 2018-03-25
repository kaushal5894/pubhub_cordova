angular.module('eventList')
  .controller('EventListController', function ($scope, $http, pubhub, $routeParams, navMenuService, $mdSidenav, $timeout, spinnerService, $q, $location) {

      var filter;
      $scope.isShowFilter = false;

      var searchText = $location.search().q;

      var categories = pubhub.getEventCategories();
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

      function getEventsByMonth(month, forceRefresh) {

          var monthObj = $scope.months[month - 1];

          if (forceRefresh) {
              angular.forEach($scope.months, function (value, key) {
                  if (monthObj !== value) {
                      monthObj.data = null;
                  }
              });
          }

          if (!monthObj.data || forceRefresh) {
              spinnerService.showSpinner();

              return pubhub.getEventsByMonth(monthObj, searchText).then(function (data) {
                  monthObj.data = data;

                  spinnerService.hideSpinner();

              });
          } else {
              return $q.when();
          }
      }

      $scope.$watch('selectedMonth', function (newVal, oldVal) {

          getEventsByMonth(newVal).then(function () {
              if (!$scope.isLast(newVal)) { getEventsByMonth(nextMonth(newVal)) };
              if (!$scope.isFirst(newVal)) { getEventsByMonth(prevMonth(newVal)) };
          });
      })

      pubhub.onEventsChanged(function () {
          getEventsByMonth($scope.selectedMonth, true).then(function () {

              if (!$scope.isLast($scope.selectedMonth)) { getEventsByMonth(nextMonth($scope.selectedMonth), true) };
              if (!$scope.isFirst($scope.selectedMonth)) { getEventsByMonth(prevMonth($scope.selectedMonth), true) };
          });
      });



      $scope.months = [];

      pubhub.getMonths().then(function (data) {
          $scope.months = data;
          $scope.selectedMonth = new Date().getMonth() + 1;

      });

      $scope.isNextLeft = function (selectedMonth, month) {
          if (selectedMonth <= 3 && month >= 10) {
              return true;
          } else if (selectedMonth >= 10 && month <= 3) {
              return false;
          } else if (selectedMonth > month) {
              return true;
          }

          return false;
      }

      $scope.isNextRight = function (selectedMonth, month) {
          if (selectedMonth >= 10 && month <= 3) {
              return true;
          } else if (selectedMonth <= 3 && month >= 10) {
              return false
          } else if (selectedMonth < month) {
              return true;
          }

          return false;
      }

      function nextMonth(month) {
          month++;

          if (month > 12) month = 1;

          return month
      }
      $scope.nextMonth = function () {
          $scope.selectedMonth = nextMonth($scope.selectedMonth);
      }

      function prevMonth(month) {
          month--;

          if (month < 1) month = 12;

          return month;
      }
      $scope.prevMonth = function () {
          $scope.selectedMonth = prevMonth($scope.selectedMonth);
      }

      $scope.isFirst = function (month) {
          return month == new Date().getMonth() + 1
      }


      $scope.isLast = function (month) {
          return month == new Date().getMonth()
      }

      /*Before Code
      $scope.openFilter = function () {


          navMenuService.showFilter(
              pubhub.getEventCategories(),
              pubhub.eventsChanged
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

      $scope.addToFavourites = function (event) {
          pubhub.addFavEvent(event);
      }
  })
