var httpRestConfig = require('../dist');

describe('test group', () => {
  const apiService = {};
  const http = {
    get: function() {},
    post: function() {},
    put: function() {},
    delete: function() {}
  };

  const config = {
    host: 'http://dev.demo.com',
    request: ['/api/vi', 'json'],
    items: [
      {
        items: {
          upload: ['post', '/system/upload'],
          login: ['post', '/auth/admin/signin'],
          banner_delete: ['delete', '/system/banner/{id}'],
          banner_update: ['put', '/system/banner/{id}']
        }
      }
    ]
  };

  test('all the apiService attach to context:', () => {
    httpRestConfig(apiService, http, config);

    expect(typeof apiService.upload).toBe('function');
    expect(typeof apiService.login).toBe('function');
    expect(typeof apiService.banner_delete).toBe('function');
    expect(typeof apiService.banner_update).toBe('function');
  });
});
