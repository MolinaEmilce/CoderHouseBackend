const express = require('express'); //Libreria express
const app = express();
const handlebars = require('express-handlebars');//Instalas libreria : npm install express-handlebars

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
    layoutsDir: __dirname + '/views/layouts', //Directorio donde estan ...
    partialsDir: __dirname + '/views/partials/' //Directorio donde estan ...
}));
//Configuracion de motor de plantilla
app.set('view engine', 'hbs'); // registra el motor de plantilla
app.set('views', './views'); // especifica el directorio de las vistas
//---------------------------------------------------------------------

//Configuracion de modulos del controlador
const productos = require('./Controlador/productController');

//Configuracion para ruta
const routerProductos = express.Router();
//Vista del formulario
routerProductos.get('/',(req,res)=>{
    res.render('form');
})
//Vista de la tabla de productos
routerProductos.get('/vista',(req,res)=>{
    res.render('tabla',{productos: productos.leer()});
})
//Vista de la tabla de UN producto
routerProductos.get('/vista/:id',(req,res)=>{
    let id = req.params.id;
    let resultado = productos.leerId(id);
    res.render('tabla',{productos: resultado});

})
//Accion de guardar producto
routerProductos.post('/guardar',(req,res)=>{
    productos.guardar(req.body)
    res.render('form')
})
//Accion de modificar un producto
routerProductos.put('/actualizar/:id',(req,res)=>{
    let productQuery = req.query;
    let idProduct = req.params.id
    let rta = productos.actualizar(productQuery,idProduct)
    res.json(rta);
})
routerProductos.delete('/eliminar/:id',(req,res)=>{
    let idProduct = req.params.id;
    let rta =  productos.eliminar(idProduct);
    res.json(rta)
})




//Ruta global, segun sus rutas pasadas...
app.use('/productos', routerProductos);




//Configuracion de servidor
const PORT = 8000;
app.listen(PORT,()=>console.log('Servidor corriendo...'));