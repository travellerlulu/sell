//启动http server运行打包后的文件，利用express启动小型server
var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;
var app = express();

var router = express.Router();

//router异步接口
router.get('/', (req,res,next) => {
  "use strict";
  req.url = '/index.html';
  next();
});
app.use(router);
var appData = require('./data.json');
var seller = appData.seller;
var ratings = appData.ratings;
var goods = appData.goods;

var apiRoutes = express.Router();
apiRoutes.get('/seller',function (req,res) {
  res.json({
    errno: 0,
    data: seller
  })
});
apiRoutes.get('/goods',function (req,res) {
  res.json({
    errno: 0,
    data: goods
  })
});
apiRoutes.get('/ratings',function (req,res) {
  res.json({
    errno: 0,
    data: ratings
  });
});
app.use('/api',apiRoutes);

//定义static目录，将目录指向dist
app.use(express.static('./dist'));
//启动express
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port);
})
