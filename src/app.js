/*
 * @Author: peter.yuan 
 * @Date: 2018-04-19 16:49:15 
 * @Last Modified by: peter.yuan
 * @Last Modified time: 2018-04-19 20:53:24
 */
const PORT = 3000;
const koa = require('koa');
const multer = require('koa-multer');
const Router = require('koa-router');
const hbs = require('koahub-handlebars');
const serve = require('koa-static');
const path = require('path');
const { getJSONBySheet, getWorkSheets, writeJson2File } = require('./util');
const UPLOAD_PATH = path.join(__dirname, '../public/uploads');
const DOWNLOAD_PATH = path.join(__dirname, '../public/downloads/');
const VIEW_PATH = path.join(__dirname, '../views');
const LAYOUT_PATH = path.join(__dirname, '../views/layouts');
const FILE_NAME = 'uploadfile.xlsx';
const FULL_FILE_NAME = path.join(__dirname, '../public/uploads/uploadfile.xlsx');
console.log('UPLOAD_PATH :', UPLOAD_PATH);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, FILE_NAME)
  }
})

const upload = multer({ storage: storage })


const router = new Router();

router.post('/upload', upload.single('file'), async (ctx, next) => {
  let { SheetNames, Sheets } = await getWorkSheets(FULL_FILE_NAME);
  SheetNames.forEach(n => {
    let sheet = Sheets[n];
    let json = getJSONBySheet(sheet);
    writeJson2File(json, DOWNLOAD_PATH + n + '.json');
  })
  ctx.body = SheetNames;
});

router.get('/', async (ctx, next) => {
  await ctx.render('index', { title: 'Excel2Data', header: 'Koa2 excel to Data' });
})

const app = new koa();


app
  .use(serve('.'))
  .use(hbs.middleware({
    extname: '.html',
    viewPath: VIEW_PATH,
    layoutsPath: LAYOUT_PATH,
    defaultLayout: 'layout'
  }))
  .use(router.routes())
  .use(router.allowedMethods());


app.on('error', error => {
  console.log('SERVER ERROR:', error.message);
})





app.listen(PORT, () => {
  console.log('=================================================');
  console.log('app start on:', PORT);
  console.log('=================================================');
});