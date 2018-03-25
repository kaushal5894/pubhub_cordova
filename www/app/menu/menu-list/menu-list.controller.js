angular.module('menuList')
  .controller('MenuListController', function ($scope, $http, pubhub, $routeParams) {
      var $ctrl = this;

     this.toggleItem = function (item) {
         item.showChildren = !item.showChildren
      }

     this.showChildren = function (group, parent) {

         parent = parent || group;

         return group.showChildren && parent.showChildren;

     }

     $scope.$watch(function () { return $ctrl.menus }, function (newVal, oldVal) {
         
         if (newVal && newVal.length == 1) {
             newVal[0].showChildren = true;
         }


     })


  })


