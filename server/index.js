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

app.set('trust proxy');



mongoose.connect(config.db.uri, { useNewUrlParser: true }).then(conn => {
  console.log("Connected To Mongo DB")
  start();
}).catch(err => {
  console.log("Failed To Connect To MongoDB");
  console.log(err)
});

// require("./tasks/restockCloudlinux");
// require("./tasks/renewals");
// require("./tasks/restockImunify360");

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection, stringify: false }),
  // cookie: {secure: true}
}));

app.use(bodyParser.json());
app.enable("trust proxy");
app.use(require("./routes"));



// setInterval(() => {
//
// }, 1000 * 60 * 60 * 24);



async function start () {
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
  app.listen(port, "0.0.0.0");
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
