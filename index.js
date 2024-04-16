
const express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const router = express.Router();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


//------------------------------------------------------------------
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Let us run the server. SO its running,
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



const db = mysql.createConnection({
    user: 'u196388150_SPVM',
    host: '154.56.47.52',
    port: 3306,
    password: 'uJ7DBi4NRQj$1', 
    database: 'u196388150_SPVM',
}) 

/*  const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', 
    database: 'db_integra',
})  */

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Base de datos conectada');
});


//logica para mandar datos a la base de datos 

app.post('/register', (req, res)=>{
    // We need to get variables sent from the form
    const sentEmail =  req.body.Email
    const sentUserName =  req.body.UserName
    const sentPassword =  req.body.Password

  
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)' 
    const Values = [sentEmail, sentUserName, sentPassword]

   
    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('User inserted succcessfully!')
            res.send({message: 'User added!'})
        
        }
    })
    
})


app.post('/login', (req, res)=>{
     

     const sentloginUserName =  req.body.LoginUserName
     const sentLoginPassword =  req.body.LoginPassword
 
    
     const SQL = 'SELECT * FROM users WHERE username = ? && password = ?' 
     const Values = [sentloginUserName, sentLoginPassword]

      
    db.query(SQL, Values, (err, results)=>{
        if(err){
            console.log('Error')
        }
        if(results.length > 0){
            res.send(results)
        }
        else{
            res.send({message: `Credentials Don't match!`})
            
        }
    })
})

app.use('/api', router);

//////////////////////////////////////////////LOGICA PRODUCTOS////////////////////////////////////////////////////////////////////////////////////////////////////
// Ruta para obtener todos los productos
router.get('/productos', (req, res) => {
    const sqlQuery = 'SELECT * FROM productos';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error al obtener productos'});
            return;
        } 
        res.json(results);
    });
});

// Ruta para editar un producto
router.put('/productos/:id', (req, res) => {
    const productId = req.params.id;
    const { QR, Nombre, Categoria, Cantidad } = req.body; // Agregamos Cantidad aquí

    const sqlQuery = 'UPDATE productos SET QR = ?, Nombre = ?, Categoria = ?, Cantidad = ? WHERE IdProducto = ?'; // Agregamos Cantidad aquí
    const values = [QR, Nombre, Categoria, Cantidad, productId]; // Agregamos Cantidad aquí

    db.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error al editar producto:', err);
            res.status(500).json({ error: 'Error al editar producto' });
            return;
        }
        console.log('Producto editado exitosamente');
        res.status(200).json({ message: 'Producto editado exitosamente' });
    });
});



// Ruta para eliminar un producto
router.delete('/productos/:id', (req, res) => {
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
});

// Ruta para agregar un nuevo producto
router.post('/productos', (req, res) => {
    // Extraemos los datos del cuerpo de la solicitud
    const { QR, Nombre, Categoria } = req.body;

    // Creamos la consulta SQL para insertar el nuevo producto
    const SQL = 'INSERT INTO productos (QR, Nombre, Categoria) VALUES (?, ?, ?)';
    const values = [QR, Nombre, Categoria];

    // Ejecutamos la consulta SQL
    db.query(SQL, values, (err, result) => {
        if (err) {
            console.error('Error al insertar producto:', err);
            res.status(500).json({ error: 'Error al insertar producto' });
            return;
        }
        console.log('Producto insertado correctamente');
        res.status(200).json({ message: 'Producto insertado correctamente' });
    });
});

//////////////////////////////////////////////////////LOGICA USUARIOS///////////////////////////////////////////////////////////////////////////77
// Ruta para obtener todos los usuarios
router.get('/users', (req, res) => {
    const sqlQuery = 'SELECT * FROM users';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios'});
            return;
        } 
        res.json(results);
    });
});

// Ruta para editar un producto
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const {  email, username, password} = req.body; // Agregamos Password aquí

    const sqlQuery = 'UPDATE users SET  email = ?, username = ?, password = ? WHERE id = ?'; // Agregamos Password aquí
    const values = [ email, username, password, userId]; // Agregamos Cantidad aquí

    db.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error al editar usuario:', err);
            res.status(500).json({ error: 'Error al editar usuario' });
            return;
        }
        console.log('Usuario editado exitosamente');
        res.status(200).json({ message: 'Usuario editado exitosamente' });
    });
});



// Ruta para eliminar un producto
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const sqlQuery = 'DELETE FROM users WHERE id = ?';
    const values = [userId];

    db.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            res.status(500).json({ error: 'Error al eliminar uaurio' });
            return;
        }
        console.log('Usuario eliminado exitosamente');
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    });
});

// Ruta para agregar un nuevo producto
router.post('/users', (req, res) => {
    // Extraemos los datos del cuerpo de la solicitud
    const { email, username, password } = req.body;

    // Creamos la consulta SQL para insertar el nuevo producto
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const values = [email, username, password];

    // Ejecutamos la consulta SQL
    db.query(SQL, values, (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            res.status(500).json({ error: 'Error al insertar usuario' });
            return;
        }
        console.log('Usuario insertado correctamente');
        res.status(200).json({ message: 'Usuario insertado correctamente' });
    });
});


// Usar el enrutador definido para todas las rutas bajo /api
app.use('/api', router);

//------------------------------------------logica para las graficas -----------------------------------------------------------------------------
