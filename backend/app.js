require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("./api/router/router");
const blockchainRouter = require("./dev/router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = process.env.PORT;
// port = process.argv[2];

function responseTimeLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${elapsed}ms`);
  });
  next();
}

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(responseTimeLogger);
app.use("/", router, blockchainRouter);

app.listen(port, () => {
  console.log(`listening at port ${port} ........`);
});
