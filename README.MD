# http-curd-config
> A simple curd config for react project.

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
      const {message, code} = inError.response.data;
      AppBase.message(message || code, 'error');
      AppBase.$.memory = {searching: false};
      AppBase.$.session = {
        search_result: {
          data: []
        }
      };
    }
  }
});
```

## example config:
```js
static APIS = {
    baseUrl: '/api/v1',
    items: {
      /**
       * 登录部分
       * auth
       */
      'signin': ['POST', '/auth/signin'],
      'reqister': ['POST', '/auth/register'],
      'sms': ['POST', '/auth/sms'],
      'reset': ['POST', '/auth/resetpassword'],
      /**
       * 订单及支付
       * trades
       */
      'carts': ['GET', '/trades/carts'],
      'delete_one': ['DELETE', '/trades/carts/{id}']
    }
  };

  ```

## usage:
```js
import httpCurdConfig from 'http-curd-config';

export default nx.declare({
  statics: {
    init () {
      httpCurdConfig(this, MyHttp, APIS);
    }
  }
});
```
