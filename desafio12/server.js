const express = require('express'); //Libreria express
const app = express();
const handlebars = require('express-handlebars');//Instalas libreria : npm install express-handlebars
const { Socket } = require('socket.io');
//Configuracion socket...
const http = require('http').Server(app); //Se importada el modulo http para que el socket funcione

//WEBSOCKET DEL LADO DEL SERVIDOR : 
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);


//Configuracion  de parseo y json a modo aplicacion: es decir al mostrarse del lado del cliente s transfoma en json, y al recibir el dato en el server lo parsea a objeto
//---Esto es importante a la hora de comunicarnos con los http, en lo principal con el POST Y PUT(porque sino no vamos a poder interactuar con los datos recbidos y enviados)
app.use(express.json());//parsea json a modo aplicacion
app.use(express.urlencoded({ extended: true }));//parsea urlenconded: agarra la informacion dodeado y la tranformar en un objeto.
//----------------------------------------------------------

//Configuracion de archivos estaticos
app.use(express.static('public')); 
//-------------------------------------------------------
//Configuracion de motor de plantilla
//defino el motor de plantilla ('nombredeextension y motor', funcion)
// configuracion de handlebars en express
app.engine('hbs', handlebars({//LLama a la libreria
    //Configuracion 
    extname: '.hbs', //Extension del archivo
    defaultLayout: 'index.hbs', //Pagina o archivo por defectp
    layoutsDir: __dirname + '/public', //Directorio donde estan ...
}));
//Configuracion de motor de plantilla
app.set('view engine', 'hbs'); // registra el motor de plantilla
app.set('views', './views'); // especifica el directorio de las vistas
//---------------------------------------------------------------------

app.get('/',(req,res)=>{
    res.render('productosForm',{productos : productos });
})

const productos = [];

io.on('connection', socket => {
    console.log('Conexion socket realizada')

    socket.emit('mis productos', productos)

    socket.on('mis productos', data =>{
        productos.push({id: socket.id, title : data.title, price : data.price, thumbnail : data.thumbnail })
        console.log(data)
        io.sockets.emit('mis productos', productos)
    })
})


//Configuracion de servidor
const PORT = 8000;

http.listen(PORT,()=>console.log('Servidor corriendo...'));