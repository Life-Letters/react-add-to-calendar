'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helpers = function () {
    function helpers() {
        _classCallCheck(this, helpers);
    }

    _createClass(helpers, [{
        key: 'getRandomKey',
        value: function getRandomKey() {
            var n = Math.floor(Math.random() * 999999999999).toString();
            return new Date().getTime().toString() + '_' + n;
        }
    }, {
        key: 'formatTime',
        value: function formatTime(date) {
            var formattedDate = _moment2.default.utc(date).format('YYYYMMDDTHHmmssZ');
            return formattedDate.replace('+00:00', 'Z');
        }
    }, {
        key: 'calculateDuration',
        value: function calculateDuration(startTime, endTime) {
            // snag parameters and format properly in UTC
            var end = _moment2.default.utc(endTime).format('DD/MM/YYYY HH:mm:ss');
            var start = _moment2.default.utc(startTime).format('DD/MM/YYYY HH:mm:ss');

            // calculate the difference in milliseconds between the start and end times
            var difference = (0, _moment2.default)(end, 'DD/MM/YYYY HH:mm:ss').diff((0, _moment2.default)(start, 'DD/MM/YYYY HH:mm:ss'));

            // convert difference from above to a proper momentJs duration object
            var duration = _moment2.default.duration(difference);

            return Math.floor(duration.asHours()) + _moment2.default.utc(difference).format(':mm');
        }
    }, {
        key: 'buildUrl',
        value: function buildUrl(event, type, isCrappyIE) {
            var calendarUrl = '';

            switch (type) {
                case 'google':
                    calendarUrl = 'https://www.google.com/calendar/event';
                    calendarUrl += '?action=TEMPLATE';
                    calendarUrl += '&text=' + event.title;
                    calendarUrl += '&dates=' + this.formatTime(event.startTime);
                    calendarUrl += '/' + this.formatTime(event.endTime);
                    calendarUrl += '&details=' + event.description;
                    calendarUrl += '&location=' + encodeURIComponent(event.location);
                    calendarUrl += '&sprop=&sprop=name:Alpha';
                    break;

                case 'yahoo':
                    // yahoo doesn't utilize endTime so we need to calulate duration
                    var duration = this.calculateDuration(event.startTime, event.endTime);
                    calendarUrl = 'https://calendar.yahoo.com/?v=60&view=d&type=20';
                    calendarUrl += '&title=' + event.title;
                    calendarUrl += '&st=' + this.formatTime(event.startTime);
                    calendarUrl += '&dur=' + duration;
                    calendarUrl += '&desc=' + event.description;
                    calendarUrl += '&in_loc=' + encodeURIComponent(event.location);
                    break;

                default:
                    calendarUrl = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', 'URL:' + document.URL, 'DTSTART:' + this.formatTime(event.startTime), 'DTEND:' + this.formatTime(event.endTime), 'SUMMARY:' + event.title, 'DESCRIPTION:' + event.description, 'LOCATION:' + event.location, 'END:VEVENT', 'END:VCALENDAR'].join('\n');

                    if (!isCrappyIE) {
                        calendarUrl = encodeURI('data:text/calendar;charset=utf8,' + calendarUrl);
                    }
            }

            return calendarUrl;
        }
    }]);

    return helpers;
}();

exports.default = helpers;
