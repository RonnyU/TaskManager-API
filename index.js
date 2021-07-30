const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

//habilitar express.json
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

//import routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/project', require('./routes/project'));
app.use('/api/task', require('./routes/task'));

app.listen(PORT, () => {
  console.log(
    `El servidor esta corriendo en el puerto http://localhost:${PORT}/`
  );
});
