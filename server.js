const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const Datastore = require('nedb-promises');
const markers = new Datastore('data.json');

const app = new Koa();
var router = new Router();

app.use(router.routes())
    .use(router.allowedMethods())
    .use(bodyParser());

router.get('/', (ctx, next) => {
    ctx.body = {test: 1};
});

router.get('/markers', async (ctx, next) => {
    let result = await markers.find();
    ctx.body = result;
});

router.post('/add', async (ctx, next) => {
    console.log('add input');
    var result = await markers.insert(ctx.request.body);
    ctx.body = {result: 'success'};
});

app.listen(3000);
console.log('listen 3000');