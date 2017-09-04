'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

var Remarkable = _react2['default'].createClass({
  displayName: 'Remarkable',

  getDefaultProps: function getDefaultProps() {
    return {
      container: 'div',
      options: {},
      plugins: []
    };
  },

  render: function render() {
    var Container = this.props.container;

    return _react2['default'].createElement(
      Container,
      null,
      this.content()
    );
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    var _this = this;

    if (nextProps.options !== this.props.options || nextProps.plugins !== this.props.plugins) {
      this.md = new _remarkable2['default'](nextProps.options);
      nextProps.plugins.forEach(function (elem) {
        _this.md.use(elem);
      });
    }
  },

  content: function content() {
    var _this2 = this;

    if (this.props.source) {
      return _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: this.renderMarkdown(this.props.source) } });
    } else {
      return _react2['default'].Children.map(this.props.children, function (child) {
        if (typeof child === 'string') {
          return _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: _this2.renderMarkdown(child) } });
        } else {
          return child;
        }
      });
    }
  },

  renderMarkdown: function renderMarkdown(source) {
    var _this3 = this;

    if (!this.md) {
      this.md = new _remarkable2['default'](this.props.options);
      this.props.plugins.forEach(function (elem) {
        _this3.md.use(elem);
      });
    }

    return this.md.render(source);
  }

});

exports['default'] = Remarkable;
module.exports = exports['default'];