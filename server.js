const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const fs = require('fs');
const Datastore = require('nedb-promises');
const markers = new Datastore('data.json');

const app = new Koa();
var router = new Router();

app.use(bodyParser());
app.use(json());
app.use(router.routes())
    .use(router.allowedMethods());


router.get('/', (ctx, next) => {
    ctx.body = {test: 1};
});

router.get('/markers', async (ctx, next) => {
    let result = await markers.find();
    ctx.body = result;
});

router.post('/add', async (ctx, next) => {
    var result = await markers.insert(ctx.request.body);
    ctx.body = {result: 'success'};
});



app.listen(3000);
console.log('listen 3000');