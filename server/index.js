const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// Import and Set Nuxt.js options
const Nuxtconfig = require('../nuxt.config.js');
const config = require("./config");
Nuxtconfig.dev = process.env.NODE_ENV !== 'production';
const  InvDB = require("./models/Investments");
const formidableMiddleware = require('express-formidable');

app.set('trust proxy');



mongoose.connect(config.db.uri, { useNewUrlParser: true }).then(conn => {
  console.log("Connected To Mongo DB")
  start();
}).catch(err => {
  console.log("Failed To Connect To MongoDB");
  console.log(err)
});

require("./tasks/auto-expire-spinns");
// require("./tasks/renewals");
// require("./tasks/restockImunify360");

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection, stringify: false }),
  // cookie: {secure: true}
}));
// app.use(function(req, res, next) {
//   req.rawBody = '';
//   req.setEncoding('utf8');
//
//
//   req.on('data', function(chunk) {
//     req.rawBody += chunk;
//   });
//
//   req.on('end', function() {
//     console.log(req.rawBody)
//     next();
//   });
// });
// app.use(formidableMiddleware());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.enable("trust proxy");
app.use(require("./routes"));



// setInterval(() => {
//
// }, 1000 * 60 * 60 * 24);



async function start () {
  // let rec = await InvDB.find()
  // let count = 0;
  // for (let re of rec ){
  //   count += re.amount;
  //   // console.log(re.amount)
  // }
  // console.log(count)
  // Init Nuxt.js
  const nuxt = new Nuxt(Nuxtconfig);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (Nuxtconfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
