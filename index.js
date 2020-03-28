const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // this line goes first
require('./services/passport'); // this line goes second
const bodyParser = require('body-parser');
//import express from "express";

// Connects Mongoose to MongoDB
mongoose
  .connect(keys.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database Connected'))
  .catch(err => {
    console.log(Error, err.message);
  });

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    // 30 = 30 days,  24 = 24 hours in a day,  60 = 60 minutes in a hour,  60 = 60 seconds in a minute, 1000= 1000 milliseconds in a second  ==== 30 days in total
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

require('./routes/billingRoutes')(app);
// console.developers.google.com


// ----- FOR PRODUCTION ------- //
// for Express to behave correctly when in production at Heroku
if (process.env.NODE_ENV === 'production') {
  // Express will serve up producton assets
  // like main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file if
  // if does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// ------- END OF FOR PRODUCTION ---------//

// This gets a dynamic port used by Heroku (prod) or use port 5000 (dev)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started using port ${PORT}`);
});
