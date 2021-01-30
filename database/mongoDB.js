const mongoose = require('mongoose');

const URL = "mongodb://localhost/nodejschat";
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
module.exports = db;
