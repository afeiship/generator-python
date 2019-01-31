import nx from 'next-js-core2';
import NxDataTransform from 'next-data-transform';
import nxTmpl from 'next-tmpl';
import nxContentType from 'next-content-type';

function httpRestConfg(inApiContext, inHttp, inConfig) {
  const { host, request, items } = inConfig;
  const baseUrl = host || `//${location.host}`;

  items.forEach(function(item) {
    const _request = item.request;
    const _items = item.items;
    const _url = item.host;

    nx.each(_items, function(key, _item) {
      inApiContext[key] = function(inData, inOptions) {
        const data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
        const action = String(_item[0]).toLowerCase();
        const requestData = _request || request;
        const [context, dataType] = requestData;
        const contentType = nxContentType(dataType);
        const apiPath = _item[1].indexOf('{') > -1 ? nxTmpl(_item[1], data) : _item[1];
        const options = nx.mix({ headers: { 'Content-Type': contentType } }, inOptions);

        return inHttp[action](
          `${_url || baseUrl}${context}${apiPath}`,
          NxDataTransform[dataType](data),
          options
        );
      };
    });
  });
}

module.exports = httpRestConfg;
export default httpRestConfg;
