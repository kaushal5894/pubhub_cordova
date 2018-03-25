angular.module('slider', [
  'ngAnimate'
]);

angular.
  module('slider').
  directive('slider', function () {

      return {
          scope: {
              slider: '=',
              sliderNext: '&',
              sliderNextStart: '&',
              sliderSwipeLeft: '&', 
              sliderSwipeRight: '&', 
              sliderSwipeStart: '&'
          },
          controller: function ($scope, $timeout) {

              $scope.slider = $scope.slider || 0;

              $scope.options = {
                  longTouch: false,
                  touchstartx: undefined,
                  touchstarty: undefined,
                  touchmovex: undefined,
                  touchmovey: undefined,
                  slideWidth: 0,
                  slideHeight: 0,
                  movex: undefined,
                  movey: undefined,
                  direction: ''
              }

              $scope.el = {
                  slider: "#slider",
                  holder: ".slide-wrapper"
              }

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

                  }

                  // Calculate distance to translate holder.
                  $scope.options.movex = ($scope.options.touchstartx - $scope.options.touchmovex);
                  $scope.options.movey = ($scope.options.touchstarty - $scope.options.touchmovey);

                  if ($scope.options.direction == 'x') {
                      var move = -1 * $scope.options.movex;
                      var moveY = -1 * $scope.options.movey;
                      var rotate = move / $scope.options.slideWidth * 20;

                      //console.debug(move);

                      $scope.el.holder
                          .css('transform', 'translate3d(' + move + 'px,' + moveY + 'px,0) rotate(' + rotate + 'deg)');

                      var absMove = Math.abs($scope.slider * $scope.options.slideWidth - $scope.options.movex);
                      if (absMove > $scope.options.slideWidth / 6 || $scope.options.longTouch === false) {

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

                  } else if ($scope.options.direction == 'y') {
                      var move = -1 * $scope.options.movey;
                      $scope.el.holder
                          .css('transform', 'translate3d(0,' + move + 'px,0)');
                  }
              }

              $scope.$watch('slider', function () {

                  if ($scope.slider != 1) {
                      $scope.el.slider.addClass('favourited')
                  } else {
                      $scope.el.slider.removeClass('favourited')
                  }
                  // Move and animate the elements.
                  $scope.el.holder
                      .addClass('animate')
                      .css('transform', 'translate3d(-' + $scope.slider * $scope.options.slideWidth + 'px,0,0)');

              })

              $scope.end = function (event) {
                  // Calculate the distance swiped.
                  // Calculate the index. All other calculations are based on the index.

                  if ($scope.options.direction == 'x') {
                      var absMove = Math.abs($scope.slider * $scope.options.slideWidth - $scope.options.movex);
                      if (absMove > $scope.options.slideWidth / 6 || $scope.options.longTouch === false) {
                          if ($scope.options.movex > 0) {
                              $scope.el.holder
                                  .addClass('animate')
                                  .css('transform', 'translate3d(-50%,80%,0) rotate(-180deg)')
                                  .css('opacity', '0.4');
                          } else {
                              $scope.el.holder
                                  .addClass('animate')
                                  .css('transform', 'translate3d(50%,0,0) rotate(90deg)')
                                  .css('opacity', '0.4');
                          }

                          $timeout(function () {
                              $scope.sliderSwipeStart();
                          });
                          $timeout(function () {

                              if ($scope.options.movex > 0) {
                                  $scope.sliderSwipeLeft();
                              } else {
                                  $scope.sliderSwipeRight();
                              }

                              $scope.el.holder
                                  .removeClass('animate')
                                  .css('transform', 'translate3d(0,0,0)')
                                  .css('opacity', '1');

                              $scope.el.slider.removeClass('swiping-right')
                              $scope.el.slider.removeClass('swiping-left')


                          }, 500)

                          $scope.$apply();
                      } else {
                          $scope.el.holder
                              .addClass('animate')
                              .css('transform', 'translate3d(0,0,0)');

                      }
                  } else if ($scope.options.direction == 'y') {
                      var absMove = Math.abs($scope.options.movey);

                      if (absMove > $scope.options.slideHeight / 2 || $scope.options.longTouch === false) {

                          if ($scope.options.movey > 0) {
                              $scope.el.holder
                                  .addClass('animate')
                                  .css('transform', 'translate3d(0,-100%,0)')
                                  .css('opacity', '0.4');
                          } else {
                              $scope.el.holder
                                  .addClass('animate')
                                  .css('transform', 'translate3d(0,100%,0)')
                                  .css('opacity', '0.4');
                          }


                          $timeout(function () {
                              $scope.sliderNextStart();
                          });
                          $timeout(function () {
                              $scope.sliderNext();
                              $scope.el.holder
                                  .removeClass('animate')
                                  .css('transform', 'translate3d(0,0,0)')
                                  .css('opacity', '1');
                          }, 500)

                          $scope.$apply();

                      } else {

                          //$scope.el.slider.css('padding-top', 0);
                          //$scope.el.slider.css('padding-bottom', 0);

                          $scope.el.holder
                              .addClass('animate')
                              .css('transform', 'translate3d(0,0,0)');

                      }
                  }

                  $scope.options.direction = '';

              }


          },
          link: function ($scope, element, attrs) {

              $scope.el = {
                  slider: element,
                  holder: element.find(".slide-wrapper")
              }

              $scope.el.holder.on('touchstart', function (event) {
                  $scope.start(event);
              })

              $scope.el.holder.on('touchmove', function (event) {
                  $scope.move(event);
              })

              $scope.el.holder.on('touchend', function (event) {
                  $scope.end(event);
              })


              $scope.options.slideWidth = element.width();

              $scope.el.holder.css('transform', 'translate3d(-' + $scope.slider * $scope.options.slideWidth + 'px,0,0)');

          }
      }

  });

