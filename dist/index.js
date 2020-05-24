"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nextJsCore = _interopRequireDefault(require("@feizheng/next-js-core2"));

var _nextDataTransform = _interopRequireDefault(require("@feizheng/next-data-transform"));

var _nextTmpl = _interopRequireDefault(require("@feizheng/next-tmpl"));

var _nextContentType = _interopRequireDefault(require("@feizheng/next-content-type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function httpRestConfg(inApiContext, inHttp, inConfig) {
  var host = inConfig.host,
      request = inConfig.request,
      items = inConfig.items;
  var baseUrl = host || "//".concat(location.host);
  items.forEach(function (item) {
    var _request = item.request;
    var _items = item.items;
    var _url = item.host;

    _nextJsCore["default"].each(_items, function (key, _item) {
      inApiContext[key] = function (inData, inOptions) {
        var data = Array.isArray(inData) ? _nextJsCore["default"].mix.apply(_nextJsCore["default"], inData) : inData;
        var action = String(_item[0]).toLowerCase();
        var requestData = _request || request;

        var _requestData = _slicedToArray(requestData, 2),
            context = _requestData[0],
            dataType = _requestData[1];

        var contentType = (0, _nextContentType["default"])(dataType);
        var apiPath = (0, _nextTmpl["default"])(_item[1], data);

        var options = _nextJsCore["default"].mix({
          headers: {
            'Content-Type': contentType
          }
        }, _item[2], inOptions);

        return inHttp[action]("".concat(_url || baseUrl).concat(context).concat(apiPath), _nextDataTransform["default"][dataType](data), options);
      };
    });
  });
}

module.exports = httpRestConfg;
var _default = httpRestConfg;
exports["default"] = _default;