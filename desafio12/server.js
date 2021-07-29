const express = require('express'); //Libreria express
const app = express();
const handlebars = require('express-handlebars');//Instalas libreria : npm install express-handlebars
const { Socket } = require('socket.io');
//Configuracion socket...
const http = require('http').Server(app); //Se importada el modulo http para que el socket funcione

//WEBSOCKET DEL LADO DEL SERVIDOR : 
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);

app.use(express.json());//parsea json a modo aplicacion
app.use(express.urlencoded({ extended: true }));//parsea urlenconded: agarra la informacion dodeado y la tranformar en un objeto.
//----------------------------------------------------------

//Configuracion de archivos estaticos
app.use(express.static('public')); 
//-------------------------------------------------------
// configuracion de handlebars en express
app.engine('hbs', handlebars({//LLama a la libreria
    //Configuracion 
    extname: '.hbs', //Extension del archivo
    defaultLayout: 'index.hbs', //Pagina o archivo por defectp
}));
//Configuracion de motor de plantilla
app.set('view engine', 'hbs'); // registra el motor de plantilla
app.set('views',__dirname + '/views'); // especifica el directorio de las vistas
//---------------------------------------------------------------------

const productos = require('./controlador/productController');

io.on('connection', async socket => {
    console.log('Conexion socket realizada')

    socket.emit('mis productos', productos.leer())

    socket.on('actualizo', data =>{
        console.log(data)
        io.sockets.emit('mis productos', productos)
    })
})

//RUTAS
const productRouter = require('./rutas/productRouter')
app.use('/productos', productRouter)

//Configuracion de servidor
const PORT = 8000;

http.listen(PORT,()=>console.log('Servidor corriendo...'));