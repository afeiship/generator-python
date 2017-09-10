# http-curd-config
> A simple curd config for react project.


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

