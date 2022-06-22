const Koa = require('koa');
const path = require('path');
const KoaMount = require('koa-mount');
const KoaStatic = require('koa-static');
const KoaProxies = require('koa-proxies');

const app = new Koa();

const url = {
  development: 'http://localhost:3333/api',
  production: 'http://zihao.work:3333/api',
};

// 加载静态服务
app.use(KoaStatic(path.join(__dirname, '../dist')));

// 静态数据中接口请求转发
app.use(
  KoaMount(
    '/api',
    KoaProxies('/', {
      target: url[process.env.NODE_ENV],
      changeOrigin: true,
    }),
  ),
);

app.listen(5555, () => {
  console.info('Static Server is listening on: http://localhost:5555');
});
