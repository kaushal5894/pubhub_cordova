angular.module('swipeActions', [
]);

angular.
  module('swipeActions').
  directive('swipeActions', function () {

      return {
          scope: {
              swipped: '=',
              swipeLeft: '&',
              swipeRight: '&'
          },
          link: function ($scope, element, attrs) {
              $scope.el = {
                  slider: element,
                  holder: element.find(".swipe-actions-item"),
                  button : element.find(".md-button > a")
              };


              $scope.$watch('swipped',
                  function (newVal, oldVal) {
                      if (newVal) {

                          $scope.el.slider
                              .addClass('swipe-' + newVal);

                      } else {
                          $scope.el.slider
                              .removeClass('swipe-right')
                              .removeClass('swipe-left');
                          $scope.el.holder
                              .addClass('animate')
                              .css('transform', 'translate3d(0,0,0)');
                      }
                  });

              $scope.el.button.on('touchstart', function (event) {
                  $scope.start(event);
              });

              $scope.el.button.on('touchmove', function (event) {
                  $scope.move(event);
              });

              $scope.el.button.on('touchend', function (event) {
                  $scope.end(event);
              });

              $scope.options.slideWidth = element.width();

          },
          controller: function ($scope, $timeout) {
              $scope.options = {
              };

              $scope.start = function (event) {

                  // Test for flick.
                  $scope.options.longTouch = false;
                  setTimeout(function () {
                      $scope.options.longTouch = true;
                  }, 250);

                  // Get the original touch position.
                  $scope.options.touchstartx = event.originalEvent.touches[0].pageX;
                  $scope.options.touchstarty = event.originalEvent.touches[0].pageY;

                  // The movement gets all janky if there's a transition on the elements.
                  $('.animate').removeClass('animate');
              }

              $scope.move = function (event) {
                  // Continuously return touch position.
                  $scope.options.touchmovex = event.originalEvent.touches[0].pageX;
                  $scope.options.touchmovey = event.originalEvent.touches[0].pageY;

                  if (!$scope.options.direction) {

                       if (Math.abs($scope.options.touchstartx - $scope.options.touchmovex) > 50) {
                          $scope.options.direction = 'x';
                          //console.log('Started X');

                      } else if (Math.abs($scope.options.touchstarty - $scope.options.touchmovey) > 50) {
                          $scope.options.direction = 'y';
                          //console.log('Started Y');

                          $scope.options.slideHeight = $scope.el.slider.height();

                      } else {
                          return // Don't start the scroll until it has moved 50px;
                      }

                      //if (Math.abs($scope.options.touchstartx - $scope.options.touchmovex) > 50) {
                      //    $scope.options.direction = 'x';

                      //} else {
                      //    return // Don't start the scroll until it has moved 50px;
                      //}

                  }

                  // Calculate distance to translate holder.
                  $scope.options.movex = ($scope.options.touchstartx - $scope.options.touchmovex);

                  if ($scope.options.direction == 'x') {
                      var move = -1 * $scope.options.movex;

                      $scope.el.holder
                          .css('transform', 'translate3d(' + move + 'px,0,0)');

                      var absMove = Math.abs(move);

                      if (absMove > $scope.options.slideWidth / 6 || $scope.options.longTouch === false) {
                          //console.log(absMove);
                          if (move < 0) {
                              $scope.el.slider.removeClass('swiping-right')
                              $scope.el.slider.addClass('swiping-left')
                          } else {
                              $scope.el.slider.removeClass('swiping-left')
                              $scope.el.slider.addClass('swiping-right')
                          }
                      } else {
                          $scope.el.slider.removeClass('swiping-right')
                          $scope.el.slider.removeClass('swiping-left')
                      }

                  }
              }

              $scope.end = function (event) {
                  // Calculate the distance swiped.
                  // Calculate the index. All other calculations are based on the index.

                  if ($scope.options.direction === 'x') {
                      var absMove = Math.abs($scope.options.movex);

                      if (absMove > $scope.options.slideWidth / 6 || $scope.options.longTouch === false) {
                          if ($scope.options.movex > 0) {
                              $scope.el.holder
                                  .addClass('animate')
                                  .css('transform', 'translate3d(-100%,0,0)');
                                  //.addClass('swipe-left')

                              $scope.swipped = 'left';
                              $scope.swipeLeft();

                          } else {
                              $scope.el.holder
                                  .addClass('animate')
                                  .css('transform', 'translate3d(100%,0,0)');

                              $scope.swipped = 'right';
                              $scope.swipeRight();
                          }


                          //$timeout(function () {

                          //    if ($scope.options.movex > 0) {
                          //        $scope.sliderSwipeLeft();
                          //    } else {
                          //        $scope.sliderSwipeRight();
                          //    }

                          //    $scope.el.holder
                          //        .removeClass('animate')
                          //        .css('transform', 'translate3d(0,0,0)')
                          //        .css('opacity', '1');

                          $scope.el.slider.removeClass('swiping-right')
                          $scope.el.slider.removeClass('swiping-left')


                          //}, 500)

                          $scope.$apply();
                      } else {
                          $scope.el.holder
                              .addClass('animate')
                              .css('transform', 'translate3d(0,0,0)');

                      }
                  }

                  $scope.options.direction = '';

              }


          }
      }
  })
