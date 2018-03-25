angular.module('loginForm', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('loginForm').
  component('loginForm', {
      templateUrl: 'app/core/login-form/login-form.html',
      controller: 'LoginFormController'
  });



angular.module('loginForm')
  .controller('LoginFormController', function ($scope, $http, $location, pubhub, $timeout, $mdDialog, $q, $rootScope) {
      var $ctrl = this;

      $rootScope.isFullscreen = true;

      pubhub.isAuthenticated = false;

      var storage = window.localStorage;

      this.user = {
          email: storage.getItem('email'),
          password: storage.getItem('password')
      };

      $scope.login = function () {

          storage.setItem('email', $ctrl.user.email) // Pass a key name and its value to add or update that key.
          storage.setItem('password', $ctrl.user.password) // Pass a key name and its value to add or update that key.


          return pubhub.login($ctrl.user.email, $ctrl.user.password).then(function (data) {
              console.debug(data);
              pubhub.isAuthenticated = true;
              $location.path("/todaysOffers")
          }, function (response) {
              console.debug(response);

              $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('An error occured')
                    .textContent(response.data.failures[0].reason)
                    .ariaLabel('An error occured')
                    .ok('Ok')
                );

              return $q.reject();
          })

      }

      $scope.signUp = function () {

          pubhub.register($ctrl.user.email, $ctrl.user.password).then(function (data) {
              console.debug(data);
              pubhub.isAuthenticated = true;
              $location.path("/todaysOffers")
          }, function (response) {
              console.debug(response);

              $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('An error occured')
                    .textContent(response.data.failures[0].reason)
                    .ariaLabel('An error occured')
                    .ok('Ok')
                );
          })


      }

      $scope.showSignup = function () {
          $scope.signUpMode = true;
      }

      $scope.loginFB = function () {

          alert('Comming Soon!');
          return;

          //facebookConnectPlugin.getLoginStatus(function (response) {
          //    if (response.status === 'connected') {
          //        $timeout($scope.login);
          //    }
          //    else {
          //        facebookConnectPlugin.login(['email'], function (response) {
          //            if (response.authResponse) {
          //                $timeout($scope.login);
          //            } else {
          //                alert('Failed to login: ' + JSON.stringify(response));
          //            }
          //        }, function (response) {
          //            alert('Login error: ' + JSON.stringify(response));
          //        });
          //    }
          //}, function (response) {
          //    alert('Error: ' + JSON.stringify(response));
          //});
      }

      if ($ctrl.user.email && $ctrl.user.password) {
          $scope.hideLogin = true;

              $scope.login().then(angular.noop, function () {
                  $scope.hideLogin = false;
              });
      }

  })
