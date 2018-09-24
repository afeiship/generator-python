import nx from 'next-js-core2';
import 'next-tmpl';
import 'next-content-type';

const SEPARATOR = '{';

function httpRestConfg(inApiContext, inHttp, inConfig) {
  const baseUrl = `//${location.host}`;
  const { request, items } = inConfig;

  items.forEach(function(item){
    const _request = item.request;
    const _items = item.items;

    nx.each(_items, function (key, _item) {
      inApiContext[key] = function (inData, inOptions) {
        const data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
        const action = String(_item[0]).toLowerCase();
        const requestData = _request || request;
        const context = requestData[0];
        const contentType = nx.contentType(requestData[1]);
        const options = nx.mix({
          headers: {
            'Content-Type': contentType
          }
        }, inOptions);

        let apiPath = _item[1];
        if (apiPath.indexOf(SEPARATOR) > -1) {
          apiPath = nx.tmpl(apiPath, data);
        }

        return inHttp[action](`${baseUrl}${context}${apiPath}`, data, options);
      };
    })
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
export default httpRestConfg;
