import nx from 'next-js-core2';

function httpRestConfg(inApiContext, inHttp, inConfig){
  const { items, baseUrl } = inConfig;
  nx.each(items, (key, item) => {
    inApiContext[key] = function (inData) {
      const action = String(item[0]).toLocaleLowerCase();
      let apiPath = item[1];
      if(apiPath.indexOf('{') > -1){
        apiPath = nx.tmpl( apiPath, inData );
      }
      return inHttp[action](`${baseUrl}${apiPath}`, inData);
    };
  });
};


module.exports = httpRestConfg;
export default httpRestConfg;
