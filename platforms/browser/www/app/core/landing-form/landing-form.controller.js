angular.module('landingForm', [
  'ngMaterial', 'ngRoute', 'PubHub'
]);

angular.
  module('landingForm').
  component('landingForm', {
      templateUrl: 'app/core/landing-form/landing-form.html',
      controller: 'LandingFormController'
  });



angular.module('landingForm')
  .controller('LandingFormController', function ($scope, $http, $location, pubhub, $timeout, $mdDialog, $q, $rootScope) {
      var $ctrl = this;

      var storage = window.localStorage,
            facebookPicture = storage.getItem('picture'),
            facebookName = storage.getItem('name');
      console.log($scope.picture);

      $scope.facebookProfilePic = typeof facebookPicture === 'undefined' || facebookPicture == null ? '' : facebookPicture;
      $scope.facebookProfileName = typeof facebookName === 'undefined' || facebookName == null ? '' : facebookName;

     // $rootScope.isFullscreen = true;

     // pubhub.isAuthenticated = false;


      $scope.login = function() {
        if(typeof storage.getItem('picture') !== 'undefined' && storage.getItem('picture') != null) {
            return false;
        }
          console.log('Login');
          // FB.getLoginStatus(function(response) {
          //   console.log(response);
          //     if (response.status === 'connected') {
          //         FB.api('/me?fields=picture,name,email', function(response) {
          //           if(response.email){
          //             var email = response.email;
          //           }
          //           storage.setItem('name', response.name);
          //           storage.setItem('picture', response.picture.data.url);                    
          //         });
          //         $location.path( "/search" );
          //     }else {
          //         FB.login(function(responseone){
          //             console.log(responseone);
          //             FB.api('/me?fields=picture,name,email', function(response) {
          //               if(response.email){
          //                 var email = response.email;
          //               }
          //               storage.setItem('name', response.name);
          //               storage.setItem('picture', response.picture.data.url);
          //               $location.path( "/search" );
          //             });
          //         });
          //     }
          // });=

          facebookConnectPlugin.login(["public_profile"], function(userData) {
              console.log("UserInfo: ", userData);
                storage.setItem('name', userData.name);
                $scope.facebookProfileName = userData.name;
                facebookConnectPlugin.api(
                	"me/picture?width=300&height=300&redirect=false",
                	["public_profile"],
                	function (res) {
                	console.log('facebook details ===> ' + res);
                	$scope.$apply(function() {
                		$scope.facebookProfilePic = res.data.url;
                	})
                        storage.setItem('picture', res.data.url);
                		console.log($scope.facebookProfilePic);
                	},
                	function (res) {}
                );
            },
            function loginError (error) {
              console.error(error)
            }
          );
      }; 

     
      

  })
