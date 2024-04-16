const { db } = require('./db.js');

// Obtener todos los usuarios
function getUsers(req, res) {
    const sqlQuery = 'SELECT * FROM users';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
            return;
        }
        res.json(results);
    });
}

// Editar un usuario
function editUser(req, res) {
    const userId = req.params.id;
    const { email, username, password } = req.body;

    const sqlQuery = 'UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?';
    const values = [email, username, password, userId];

    db.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error al editar usuario:', err);
            res.status(500).json({ error: 'Error al editar usuario' });
            return;
        }
        console.log('Usuario editado exitosamente');
        res.status(200).json({ message: 'Usuario editado exitosamente' });
    });
}

// Eliminar un usuario
function deleteUser(req, res) {
    const userId = req.params.id;

    const sqlQuery = 'DELETE FROM users WHERE id = ?';
    const values = [userId];

    db.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            res.status(500).json({ error: 'Error al eliminar usuario' });
            return;
        }
        console.log('Usuario eliminado exitosamente');
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    });
}

// Agregar un nuevo usuario
function addUser(req, res) {
    const { email, username, password } = req.body;

    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const values = [email, username, password];

    db.query(SQL, values, (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            res.status(500).json({ error: 'Error al insertar usuario' });
            return;
        }
        console.log('Usuario insertado correctamente');
        res.status(200).json({ message: 'Usuario insertado correctamente' });
    });
}

module.exports = { getUsers, editUser, deleteUser, addUser };
