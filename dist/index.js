'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function httpCurdConfg(inHttp, inConfig) {
  var _this = this;

  var APIS = inConfig.APIS;

  _nextJsCore2.default.each(APIS.items, function (key, item) {
    _this[key] = function (inData) {
      var action = String(item[0]).toLocaleLowerCase();
      var apiPath = item[1];
      if (apiPath.indexOf('{') > -1) {
        apiPath = _nextJsCore2.default.tmpl(apiPath, inData);
      }
      return inHttp[action]('' + APIS.baseUrl + apiPath, inData);
    };
  });
};

module.exports = httpCurdConfg;
exports.default = httpCurdConfg;