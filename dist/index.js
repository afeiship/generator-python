'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

var _nextDataTransform = require('next-data-transform');

var _nextDataTransform2 = _interopRequireDefault(_nextDataTransform);

require('next-tmpl');

require('next-content-type');

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

        var contentType = _nextJsCore2.default.contentType(dataType);
        var apiPath = _item[1].indexOf(SEPARATOR) > -1 ? _item[1] : _nextJsCore2.default.tmpl(_item[1], data);
        var options = _nextJsCore2.default.mix({ headers: { 'Content-Type': contentType } }, inOptions);

        return inHttp[action]('' + (_url || baseUrl) + context + apiPath, _nextDataTransform2.default[dataType](data), options);
      };
    });
  });
}

module.exports = httpRestConfg;
exports.default = httpRestConfg;