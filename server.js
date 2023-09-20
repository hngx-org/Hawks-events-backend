const express = require('express');
// const { PORT } = require('./src/config/constants');
const app = express();
const cors = require('cors');
const { PORT } = require('./src/config/constants');
const errorHandler = require('./src/middlewares/error-handler');
const notFound = require('./src/middlewares/not-found');

app.use(cors());
// these already do the work of bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);
app.use(notFound);
// const PORT = process.env.PORT || 5002;

const start = async () => {
  // bring in the database

  const server = app.listen(PORT, () => {
    console.log(`App started at port: ${PORT}`);
  });
};

start();
process.on('unhandledRejection', (err) => {
  server.close(() => process.exit(1));
});
