/* eslint-disable global-require */
const dotenv = require('dotenv');

dotenv.config();
const mongodb = require('mongodb');

mongodb.connect(
  process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    module.exports = client.db();
    const app = require('./app');
    app.listen(8080);
  },
);
