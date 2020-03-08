const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors');

const env_result = dotenv.config();

if (env_result.error) {
  console.log(env_result.error);
}





const app = express();

app.use(bodyParser());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired"
    ],
    optionsSuccessStatus: 200
  })
);

app.use(morgan("combined"));
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

require('./routers/userRouter')(app);
require('./routers/productRouter')(app);

const port = process.env.PORT || 2999;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
console.log("env:", process.env.NODE_ENV);
