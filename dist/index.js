/*!
 * name: @jswork/http-rest-config
 * description: A simple rest config for react project.
 * homepage: 
 * version: 1.0.0
 * date: 2020-11-23 09:18:09
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var NxDataTransform = nx.DataTransform || require('@jswork/next-data-transform');
  var nxTmpl = nx.tmpl || require('@jswork/next-tmpl');
  var nxContentType = nx.contentType || require('@jswork/next-content-type');

  function httpRestConfg(inApiContext, inHttp, inConfig) {
    var host = inConfig.host;
    var request = inConfig.request;
    var items = inConfig.items;
    var baseUrl = host || '//' + location.host;
    var prefix = inConfig.prefix || '';

    items.forEach(function (item) {
      var _request = item.request;
      var _items = item.items;
      var _prefix = item.prefix || prefix;
      var _host = item.host;

      nx.each(_items, function (key, _item) {
        var apiKey = _prefix + key;
        inApiContext[apiKey] = function (inData, inOptions) {
          var data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
          var action = String(_item[0]).toLowerCase();
          var requestData = _request || request;
          var context = requestData[0];
          var dataType = requestData[1];
          var contentType = nxContentType(dataType);
          var apiPath = nxTmpl(_item[1], data);
          var options = nx.mix({ headers: { 'Content-Type': contentType } }, _item[2], inOptions);

          return inHttp[action](
            (_host || baseUrl) + context + apiPath,
            NxDataTransform[dataType](data),
            options
          );
        };
      });
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = httpRestConfg;
  }
})();

//# sourceMappingURL=index.js.map
