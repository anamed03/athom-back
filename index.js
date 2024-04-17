const express = require('express');
const cors = require('cors');
const { PORT } = require('./config.js');
const { connectDB } = require('./db.js');
const { setupRoutes } = require('./routes.js');
import { APP_URL } from './config.js';
const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: APP_URL
}));

// Middleware para configurar los encabezados CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', APP_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

connectDB();

setupRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
