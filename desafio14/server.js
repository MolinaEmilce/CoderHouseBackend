'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var http = require('http').Server(app);
var productos = require('./api/producto');
var fs = require('fs');
// le pasamos la constante http a socket.io
var io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs'
}));

app.set("view engine", "hbs");
app.set("views", __dirname + '/views');

var mensajes = [];

io.on('connection', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(socket) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('Nuevo cliente conectado!');
                        /* Envio los mensajes al cliente que se conectó */
                        socket.emit('productos', productos.listar());

                        /* Escucho los mensajes enviado por el cliente y se los propago a todos */
                        socket.on('update', function (data) {
                            io.sockets.emit('productos', productos.listar());
                        });
                        //CANAL DE MENSAJES

                        socket.emit('messages', mensajes);

                        socket.on('new-message', function (data) {

                            console.log(data);
                            mensajes.push(data);
                            io.sockets.emit('messages', mensajes);
                            fs.writeFileSync('./public/archivo/mensajes.txt', JSON.stringify(mensajes, null, '\t'));
                        });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

// protejo el servidor ante cualquier excepcion no atrapada
app.use(function (err, req, res, next) {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

// importo las rutas y las uso con el prefijo /api
var productosRouter = require('./routes/productos');
app.use('/api', productosRouter);

// obtengo el puerto del enviroment o lo seteo por defecto
var PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
var server = http.listen(PORT, function () {
    console.log('servidor escuchando en http://localhost:' + PORT);
});

// en caso de error, avisar
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});
