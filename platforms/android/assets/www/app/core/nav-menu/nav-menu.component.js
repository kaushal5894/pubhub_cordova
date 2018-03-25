angular.module('navMenu', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('navMenu').
  component('navMenu', {
      templateUrl: 'app/core/nav-menu/nav-menu.html',
      controller: 'NavMenuController'
  });
