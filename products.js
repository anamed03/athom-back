const { db } = require('./db.js');

// Obtener todos los productos
function getProducts(req, res) {
    const sqlQuery = 'SELECT * FROM productos';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error al obtener productos' });
            return;
        }
        res.json(results);
    });
}

// Editar un producto
function editProduct(req, res) {
    const productId = req.params.id;
    const { QR, Nombre, Categoria, Cantidad } = req.body;

    const sqlQuery = 'UPDATE productos SET QR = ?, Nombre = ?, Categoria = ?, Cantidad = ? WHERE IdProducto = ?';
    const values = [QR, Nombre, Categoria, Cantidad, productId];

    db.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error al editar producto:', err);
            res.status(500).json({ error: 'Error al editar producto' });
            return;
        }
        console.log('Producto editado exitosamente');
        res.status(200).json({ message: 'Producto editado exitosamente' });
    });
}

// Eliminar un producto
function deleteProduct(req, res) {
    const productId = req.params.id;

    const sqlQuery = 'DELETE FROM productos WHERE IdProducto = ?';
    const values = [productId];

    db.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).json({ error: 'Error al eliminar producto' });
            return;
        }
        console.log('Producto eliminado exitosamente');
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    });
}

// Agregar un nuevo producto
function addProduct(req, res) {
    const { QR, Nombre, Categoria } = req.body;

    const SQL = 'INSERT INTO productos (QR, Nombre, Categoria) VALUES (?, ?, ?)';
    const values = [QR, Nombre, Categoria];

    db.query(SQL, values, (err, result) => {
        if (err) {
            console.error('Error al insertar producto:', err);
            res.status(500).json({ error: 'Error al insertar producto' });
            return;
        }
        console.log('Producto insertado correctamente');
        res.status(200).json({ message: 'Producto insertado correctamente' });
    });
}

module.exports = { getProducts, editProduct, deleteProduct, addProduct };
