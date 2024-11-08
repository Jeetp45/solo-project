const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const pokemonRouter = require('../routes/pokemonRouter');
const connectDB = require('../db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
connectDB();

app.use(express.static(path.join(__dirname, 'client')));

// app.get('/', (req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.resolve(__dirname, '../client/index.html'));
// });

app.use('/api', pokemonRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
