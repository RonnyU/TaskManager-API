const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());

//habilitar express.json
app.use(express.json({ extended: true }));

const port = process.env.port || 4000;

//import routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/project', require('./routes/project'));
app.use('/api/task', require('./routes/task'));

app.listen(port, '0.0.0.0', () => {
  console.log(
    `El servidor esta corriendo en el puerto http://localhost:${PORT}/`
  );
});
