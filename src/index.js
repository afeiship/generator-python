import nx from 'next-js-core2';

const SEPARATOR = '{';

function httpCurdConfg(inApiContext, inHttp, inConfig){
  const { items, baseUrl } = inConfig;
  nx.each(items, (key, item) => {
    inApiContext[key] = function (inData, inOptions) {
      const action = String(item[0]).toLocaleLowerCase();
      let apiPath = item[1];
      if(apiPath.indexOf(SEPARATOR) > -1){
        apiPath = nx.tmpl( apiPath, inData );
      }
      return inHttp[action](`${baseUrl}${apiPath}`, inData, inOptions);
    };
  });
};


module.exports = httpCurdConfg;
export default httpCurdConfg;
