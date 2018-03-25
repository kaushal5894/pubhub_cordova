angular.module('PubHub')
.filter('timespan', function () {

    return function (val) {
        var RegExp = /^(\d*):(\d*):(\d*)/g;

        var match = RegExp.exec(val);

        if (match) {

            var hour = match[1];
            var minute = match[2]
            var seconds = match[3];

            var t = 'AM'

            hour = Number(hour);

            if (hour > 12) {
                t = 'PM';
                hour = hour - 12;
            } else if (!hour) {
                hour = 12
            } 

            if (!minute) {
                minute = '00';
            }

            return hour + ':' + minute + t;
        } else {
            return val;
        }

    }

})

