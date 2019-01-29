'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

var _nextDataTransform = require('next-data-transform');

var _nextDataTransform2 = _interopRequireDefault(_nextDataTransform);

var _nextTmpl = require('next-tmpl');

var _nextTmpl2 = _interopRequireDefault(_nextTmpl);

var _nextContentType = require('next-content-type');

var _nextContentType2 = _interopRequireDefault(_nextContentType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEPARATOR = '{';

function httpRestConfg(inApiContext, inHttp, inConfig) {
  var host = inConfig.host,
      request = inConfig.request,
      items = inConfig.items;

  var baseUrl = host || '//' + location.host;

  items.forEach(function (item) {
    var _request = item.request;
    var _items = item.items;
    var _url = item.host;

    _nextJsCore2.default.each(_items, function (key, _item) {
      inApiContext[key] = function (inData, inOptions) {
        var data = Array.isArray(inData) ? _nextJsCore2.default.mix.apply(_nextJsCore2.default, inData) : inData;
        var action = String(_item[0]).toLowerCase();
        var requestData = _request || request;

        var _requestData = _slicedToArray(requestData, 2),
            context = _requestData[0],
            dataType = _requestData[1];

        var contentType = (0, _nextContentType2.default)(dataType);
        var apiPath = _item[1].indexOf(SEPARATOR) > -1 ? (0, _nextTmpl2.default)(_item[1], data) : _item[1];
        var options = _nextJsCore2.default.mix({ headers: { 'Content-Type': contentType } }, inOptions);

        return inHttp[action]('' + (_url || baseUrl) + context + apiPath, _nextDataTransform2.default[dataType](data), options);
      };
    });
  });
}

module.exports = httpRestConfg;
exports.default = httpRestConfg;