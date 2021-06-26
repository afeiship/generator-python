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
          var apiPath = nxTmpl(_item[1], data);
          var options = nx.mix(null, _item[2], inOptions);
          var dataType = nx.get(options, 'dataType', requestData[1]);

          // when headers is null
          options.headers = options.headers || {};
          nx.mix(options.headers, { 'Content-Type': nxContentType(dataType) });

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
