require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require("massive");
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const auth = require('./middleware/authMiddleware')
const authCtrl = require('./controllers.js/authController')
const treasureCtrl = require('./controllers.js/treasureController')

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

//endpoints
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)

app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)

app.get('/api/treasure/all', treasureCtrl.getAllTreasure)

app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)

app.post('/auth/register', authCtrl.register)

app.post('/auth/login', authCtrl.login)

app.delete('/auth/logout', authCtrl.logout)






massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("connected to database!");
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}!`);
  });
});
