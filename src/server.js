/* NPM Installation Dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const session = require('express-session');
const cors = require("cors");
const path = require("path");

/* Server Initialization */
const app = express();
const server = require('http').Server(app);

const config = require('../config').getConfig(process.env.NODE_ENV);

/* Middleware Functionality */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  genid: (request) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: `${config.session.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: true
}));

// let corsOption = {
//   credentials: true,
//   exposedHeaders: ['x-auth-token'],
//   methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
//   origin: true
// };

// app.use(cors(corsOption));

/* Router Configuration */
const mainRouter = require('./routes/routers/router');
const userRouter = require('./routes/routers/userRouter');
const organizationRouter = require('./routes/routers/organizationRouter');
const eventRouter = require('./routes/routers/eventRouter');
const authRouter = require('./routes/routers/authRouter');

app.use('/api', mainRouter);
app.use('/api/events', eventRouter);
app.use('/api/organizations', organizationRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

const port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
