const express = require('express');
const app = express();
//Configuracion se socket..
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Config de archivos estaticos...
app.use(express.static(__dirname + '/public'));

let mensajes = [
    {
        autor : 'Emilce',
        texto : "Bienvenidos/as"
    },
    {
        autor : 'Juan',
        texto : "Que tal"
    }
]

//Inicializar el socket (del lado del servidor)
io.on('connection', socket =>{
    console.log('Un cliente se ha conectado');

    //SE ENVÍA la informacion que hay en el servidor al cliente
    socket.emit('mensajes', mensajes); //Se envia solo en a un cliente


    //RECIBE informacion del lado del cliente
    socket.on('nuevo-mensaje', mensaje =>{

            mensajes.push(mensaje);
            //ENVÍO GLOBAL, a todos los clientes conectados, es decir que a todos los que se hayan conectados, se enviara a todos
            io.sockets.emit('mensajes',mensajes)
    });
});



server.listen(8080,()=>{
    console.log('Servidor escuchando en http://localhost:8080')
})