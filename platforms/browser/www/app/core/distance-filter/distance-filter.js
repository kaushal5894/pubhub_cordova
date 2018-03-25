angular.module('PubHub')
.filter('distance', function () {

    return function (val) {
        
        if (isNaN(val)) {
            return 'Current location unavailable';
        };

        var units = "km"
        var distance = val;

        if (val < 1) {
            units = "m";
            distance = Math.round(val * 1000);
        }

        var rounded = Math.round(distance * 10) / 10;

        return rounded + units;

    }

})

