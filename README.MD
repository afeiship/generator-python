# http-rest-config
> A simple rest config for react project.

## expamle http:
```js
import nx from 'next-js-core2';
import NxAxios from 'next-axios';
const MyHttp = nx.declare({
  extends: NxAxios,
  statics: {
    instance: null,
    getInstance: function () {
      if (!MyHttp.instance) {
        MyHttp.instance = new MyHttp();
      }
      return MyHttp.instance;
    }
  },
  methods: {
    getBearerToken: function () {
      const {login} = AppBase.$.session;
      if (login) {
        return 'Bearer ' + login.token;
      }
      return null;
    },
    setRequestInterceptor: function () {
      this.axios.interceptors.request.use((config) => {
        const bearerToken = this.getBearerToken();
        bearerToken && nx.mix(config.headers.common, {Authorization: bearerToken});
        return config;
      });
    },
    contentType: function () {
      return 'application/json; charset=utf-8';
    },
    transformParam: function (inData) {
      return JSON.stringify(inData);
    },
    toData: function (inResponse) {
      return inResponse.data;
    },
    error: function (inError) {
      //todo: search error:
    }
  }
});
```

## example config:
```js
static APIS = {
  baseUrl: `//${location.host}`,
  items: {
    /**
     * 登录部分
     * auth
     */
    '/api/v1':{
      'signin': ['POST', '/auth/signin'],
      'reqister': ['POST', '/auth/register'],
    },
    /**
     * Common部分
     * sms/reset
     */
    '/api/common':{
      'sms': ['POST', '/auth/sms'],
      'reset': ['POST', '/auth/resetpassword'],
    }
  }
};
```

## usage:
```js
import httpConfig from 'http-rest-config';

export default nx.declare({
  statics: {
    init () {
      httpConfig(this, MyHttp, APIS);
    }
  }
});
```
