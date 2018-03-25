angular.module('menuList', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('menuList').
  component('menuList', {
      templateUrl: 'app/menu/menu-list/menu-list.html',
      controller: 'MenuListController',
      bindings: {
          menus: '<'
      }
  });
