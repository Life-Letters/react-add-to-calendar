'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var helpers = new _helpers2.default();

var ReactAddToCalendar = function (_React$Component) {
    _inherits(ReactAddToCalendar, _React$Component);

    function ReactAddToCalendar(props) {
        _classCallCheck(this, ReactAddToCalendar);

        var _this = _possibleConstructorReturn(this, (ReactAddToCalendar.__proto__ || Object.getPrototypeOf(ReactAddToCalendar)).call(this, props));

        _this.state = {
            optionsOpen: false,
            isCrappyIE: false
        };

        _this.toggleCalendarDropdown = _this.toggleCalendarDropdown.bind(_this);
        _this.handleDropdownLinkClick = _this.handleDropdownLinkClick.bind(_this);
        return _this;
    }

    _createClass(ReactAddToCalendar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var isCrappyIE = false;
            if (typeof window !== 'undefined' && window.navigator.msSaveOrOpenBlob && window.Blob) {
                isCrappyIE = true;
            }

            this.setState({ isCrappyIE: isCrappyIE });
        }
    }, {
        key: 'toggleCalendarDropdown',
        value: function toggleCalendarDropdown() {
            var showOptions = !this.state.optionsOpen;

            if (showOptions) {
                document.addEventListener('click', this.toggleCalendarDropdown, false);
            } else {
                document.removeEventListener('click', this.toggleCalendarDropdown);
            }

            this.setState({ optionsOpen: showOptions });
        }
    }, {
        key: 'handleDropdownLinkClick',
        value: function handleDropdownLinkClick(e) {
            e.preventDefault();
            var url = e.currentTarget.getAttribute('href');

            if (this.state.isCrappyIE && (e.currentTarget.getAttribute('class') === 'ical-link' || e.currentTarget.getAttribute('class') === 'outlook-calendar-link')) {
                var blob = new Blob([url], { type: 'text/calendar' });
                window.navigator.msSaveOrOpenBlob(blob, 'download.ics');
            } else {
                window.open(url, '_blank');
            }

            this.toggleCalendarDropdown();
        }
    }, {
        key: '_directDownloadICS',
        value: function _directDownloadICS() {
            var url = helpers.buildUrl(this.props.event, 'ICS', this.state.isCrappyIE);
            if (this.state.isCrappyIE && (e.currentTarget.getAttribute('class') === 'ical-link' || e.currentTarget.getAttribute('class') === 'outlook-calendar-link')) {
                var blob = new Blob([url], { type: 'text/calendar' });
                window.navigator.msSaveOrOpenBlob(blob, 'download.ics');
            } else {
                window.open(url, '_blank');
            }
        }
    }, {
        key: 'renderDropdown',
        value: function renderDropdown() {
            var self = this;

            var items = this.props.listItems.map(function (listItem) {
                var currentItem = Object.keys(listItem)[0];
                var currentLabel = listItem[currentItem];

                var icon = null;
                if (self.props.displayItemIcons) {
                    var currentIcon = currentItem === 'outlook' ? 'windows' : currentItem;
                    icon = _react2.default.createElement('i', { className: 'fa fa-' + currentIcon });
                }

                return _react2.default.createElement(
                    'li',
                    { key: helpers.getRandomKey() },
                    _react2.default.createElement(
                        'a',
                        { className: currentItem + '-link', onClick: self.handleDropdownLinkClick,
                            href: helpers.buildUrl(self.props.event, currentItem, self.state.isCrappyIE),
                            target: '_blank' },
                        icon,
                        currentLabel
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { className: this.props.dropdownClass },
                _react2.default.createElement(
                    'ul',
                    null,
                    items
                )
            );
        }
    }, {
        key: 'renderButton',
        value: function renderButton() {
            var buttonLabel = this.props.buttonLabel;
            var buttonIcon = null;
            var template = Object.keys(this.props.buttonTemplate);

            if (template[0] !== 'textOnly') {
                var iconPlacement = this.props.buttonTemplate[template];
                var buttonIconClass = 'react-add-to-calendar__icon--' + iconPlacement + ' fa fa-';

                if (template[0] === 'caret') {
                    buttonIconClass += this.state.optionsOpen ? 'caret-up' : 'caret-down';
                } else {
                    buttonIconClass += template[0];
                }

                buttonIcon = _react2.default.createElement('i', { className: buttonIconClass });
                buttonLabel = iconPlacement === 'right' ? _react2.default.createElement(
                    'span',
                    null,
                    buttonLabel + ' ',
                    buttonIcon
                ) : _react2.default.createElement(
                    'span',
                    null,
                    buttonIcon,
                    ' ' + buttonLabel
                );
            }

            var buttonClass = this.state.optionsOpen ? this.props.buttonClassClosed + ' ' + this.props.buttonClassOpen : this.props.buttonClassClosed;

            return _react2.default.createElement(
                'div',
                { className: this.props.buttonWrapperClass },
                _react2.default.createElement(
                    'a',
                    { className: buttonClass,
                        onClick: this._directDownloadICS.bind(this) },
                    buttonLabel
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var options = null;
            if (this.state.optionsOpen) {
                options = this.renderDropdown();
            }

            var addToCalendarBtn = null;
            if (this.props.event) {
                addToCalendarBtn = this.renderButton();
            }

            return _react2.default.createElement(
                'div',
                { className: this.props.rootClass },
                addToCalendarBtn,
                options
            );
        }
    }]);

    return ReactAddToCalendar;
}(_react2.default.Component);

exports.default = ReactAddToCalendar;


ReactAddToCalendar.displayName = 'Add To Calendar';

ReactAddToCalendar.propTypes = {
    buttonClassClosed: _react2.default.PropTypes.string,
    buttonClassOpen: _react2.default.PropTypes.string,
    buttonLabel: _react2.default.PropTypes.string,
    buttonTemplate: _react2.default.PropTypes.object,
    buttonWrapperClass: _react2.default.PropTypes.string,
    displayItemIcons: _react2.default.PropTypes.bool,
    dropdownClass: _react2.default.PropTypes.string,
    event: _react2.default.PropTypes.shape({
        title: _react2.default.PropTypes.string,
        description: _react2.default.PropTypes.string,
        location: _react2.default.PropTypes.string,
        startTime: _react2.default.PropTypes.string,
        endTime: _react2.default.PropTypes.string
    }).isRequired,
    listItems: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    rootClass: _react2.default.PropTypes.string
};

ReactAddToCalendar.defaultProps = {
    buttonClassClosed: 'react-add-to-calendar__button',
    buttonClassOpen: 'react-add-to-calendar__button--light',
    buttonLabel: 'Add to My Calendar',
    buttonTemplate: { caret: 'right' },
    buttonWrapperClass: 'react-add-to-calendar__wrapper',
    displayItemIcons: true,
    dropdownClass: 'react-add-to-calendar__dropdown',
    event: {
        title: 'Sample Event',
        description: 'This is the sample event provided as an example only',
        location: 'Portland, OR',
        startTime: '2016-09-16T20:15:00-04:00',
        endTime: '2016-09-16T21:45:00-04:00'
    },
    listItems: [{ apple: 'Apple Calendar' }, { google: 'Google' }, { outlook: 'Outlook' }, { yahoo: 'Yahoo' }],
    rootClass: 'react-add-to-calendar'
};
