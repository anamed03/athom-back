const mysql = require('mysql');
const { DB_CONFIG } = require('./config');

const db = mysql.createConnection(DB_CONFIG);

function connectDB() {
    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return;
        }
        console.log('Base de datos conectada');
    });
}

module.exports = { db, connectDB };
