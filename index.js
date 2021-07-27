const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `El servidor esta corriendo en el puerto http://localhost:${PORT}/`
  );
});
