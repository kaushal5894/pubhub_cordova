angular.
  module('PubHub').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
          when('/landing', {
              template: '<landing-form></landing-form>'
          }).
          when('/login', {
              template: '<login-form></login-form>'
          }).
          when('/search', {
              title: 'Search',
              template: '<search-screen></search-screen>'
          }).
          when('/todaysOffers', {
              title: 'What\s On',
              template: '<todays-offers></todays-offers>'
          }).
          when('/venues', {
              title: 'Venues',
              template: '<venues></venues>'
          }).
          when('/search/venues', {
              title: 'Search',
              template: '<venue-search></venue-search>'
          }).
          when('/venues/:venueID/:tab?', {
              title: 'Venue',
              template: '<venue-detail></venue-detail>'
          }).
          when('/offers', {
              title: 'Offers',
              template: '<offer-list></offer-list>'
          }).
          when('/search/events', {
              title: 'Search',
              template: '<event-search></event-search>'
          }).
          when('/events', {
              title: 'Events',
              template: '<event-list></event-list>'
          }).
          when('/events/:eventId', {
              template: '<event-list></event-list>'
          }).
          when('/favourites', {
              title: 'Saved',
              template: '<favourite-list></favourite-list>'
          }).
          when('/cards/offers/:offerId', {
              template: '<offer-card></offer-card>'
          }).
          when('/cards/events/:eventId', {
              template: '<offer-card></offer-card>'
          }).
          otherwise('/landing');
    }
  ]).
    config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDGbMv_hcMCLacqQPKZzxlDUCm6rxhUgkg',
            libraries: 'geometry,visualization'
        });
    });
