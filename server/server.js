require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require("massive");
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);






massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("connected to database!");
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}!`);
  });
});
