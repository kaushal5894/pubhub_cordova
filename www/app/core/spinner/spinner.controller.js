angular.module('spinner', [
  'PubHub'
]);

angular.
  module('spinner').
  component('spinner', {
      templateUrl: 'app/core/spinner/spinner.html',
      controller: 'SpinnerController'
  })

.service("spinnerService",
        function () {

            var spinnerCount = 0;

            this.showSpinner = function () {
                spinnerCount++;
            }

            this.hideSpinner = function () {
                spinnerCount--;
            }

            this.isSpinnerShown = function () {
                return spinnerCount > 0;
            }

        });


angular.module('spinner')
  .controller('SpinnerController', function (spinnerService) {
      var $ctrl = this;

      $ctrl.showSpinner = function () {
          return spinnerService.isSpinnerShown();
      }
      
  })

