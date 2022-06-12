const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://sleepy-escarpment-55626.herokuapp.com',
      changeOrigin: true,
    })
  );
};
