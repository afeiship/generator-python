import nx from 'next-js-core2';
import 'next-tmpl';

const SEPARATOR = '{';

function httpRestConfg(inApiContext, inHttp, inConfig) {
  const { items, baseUrl } = inConfig;
  nx.each(items, (key, item) => {
    inApiContext[key] = function (inData, inOptions) {
      const data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
      const action = String(item[0]).toLocaleLowerCase();
      let apiPath = item[1];
      if (apiPath.indexOf(SEPARATOR) > -1) {
        apiPath = nx.tmpl(apiPath, data);
      }
      return inHttp[action](`${baseUrl}${apiPath}`, data, inOptions);
    };
  });
};


module.exports = httpRestConfg;
export default httpRestConfg;
