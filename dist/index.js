'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

require('next-tmpl');

require('next-content-type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEPARATOR = '{';

function httpRestConfg(inApiContext, inHttp, inConfig) {
  var url = inConfig.url,
      request = inConfig.request,
      items = inConfig.items;

  var baseUrl = url || '//' + location.host;

  items.forEach(function (item) {
    var _request = item.request;
    var _items = item.items;

    _nextJsCore2.default.each(_items, function (key, _item) {
      inApiContext[key] = function (inData, inOptions) {
        var data = Array.isArray(inData) ? _nextJsCore2.default.mix.apply(_nextJsCore2.default, inData) : inData;
        var action = String(_item[0]).toLowerCase();
        var requestData = _request || request;
        var context = requestData[0];
        var contentType = _nextJsCore2.default.contentType(requestData[1]);
        var options = _nextJsCore2.default.mix({
          headers: {
            'Content-Type': contentType
          }
        }, inOptions);

        var apiPath = _item[1];
        if (apiPath.indexOf(SEPARATOR) > -1) {
          apiPath = _nextJsCore2.default.tmpl(apiPath, data);
        }

        return inHttp[action]('' + baseUrl + context + apiPath, data, options);
      };
    });
  });

  // nx.each(items, (context, apis) => {
  //   nx.each(apis, (key, item) => {
  //     inApiContext[key] = function (inData, inOptions) {
  //       const data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
  //       const action = String(item[0]).toLowerCase();
  //       let apiPath = item[1];
  //       if (apiPath.indexOf(SEPARATOR) > -1) {
  //         apiPath = nx.tmpl(apiPath, data);
  //       }
  //       return inHttp[action](`${baseUrl}${context}${apiPath}`, data, inOptions);
  //     };
  //   })
  // });
};

module.exports = httpRestConfg;
exports.default = httpRestConfg;