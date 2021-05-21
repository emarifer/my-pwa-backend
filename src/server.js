import express from 'express';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

// Initializations
const app = express();
require('./database');

// Set listening port
app.set('port', process.env.PORT || 3500);

// Middlewares (morgan, cors, parseador del req.body)
app.use(morgan('dev')); // Se tiene que llamar antes que entre en una ruta
app.use(cors()); // Admite configuraciones con un objeto de options
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded. VER NOTA-1

// Routes (aqui iran las rutas de la API)
app.get('/', (req, res) => {
   res.send({
       status: true,
       message: 'It works!'
   });
});

 // Middlewares que indican las rutas que se usaran para la REST API
app.use('/api', require('./routes/users.routes'));
app.use('/api', require('./routes/notes.routes'));

// Middleware for Vue.js router history mode
app.use(history()); // Tiene que estar antes de la config. como static de public. VER NOTA-2

module.exports = app;

// NOTA-1:
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327#51844327
// NOTA-2:
// https://www.npmjs.com/package/connect-history-api-fallback#introduction
// https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
