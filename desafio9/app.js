const { text, Router } = require('express');
const express = require('express');
const app = express();

//parsea json a modo aplicacion
app.use(express.json());
//parsea urlenconded: agarra la informacion dodeado y la tranformar en un objeto.
app.use(express.urlencoded({ extended: true }));
//Inicializamos los archivos estaticos: muestra html,fotos,etc
app.use(express.static('public')); 

const router = express.Router();

const puerto= 8080;
const servidor = app.listen(puerto,()=>console.log(`Corriendo en el puerto: http://localhost:${puerto}`))
servidor.on('error', error => {
    console.log('error en el servidor:', error);
});


let db = [
    {
		title: "Escuadra",
		price: 123.45,
		thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id:1
    },
    {
		title: "Escuadra",
		price: 123.45,
		thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 2
    }
]

class Productos{
    constructor(apidb){
        this.data = apidb;
    }


    leer(){
        if(this.data.length == 0){
            return {
                error : 'No hay productos'
            }
        }
        return this.data;
    }
    guardar(producto){
       let productoNew = {
           title : producto.title,
           price : producto.price,
           thumbnail : producto.thumbnail,
           id : this.data.length + 1
       }
       this.data.push(productoNew);
        return productoNew;
    }

    leerProducto(id){
        let resultado = this.data.filter(el=>{
            if(el.id == id){
                return el;
            }
        })
        if(resultado.length == 0){
            return {
                error : 'No se ha encontrado el producto'
            }
        }
        return resultado
    }

    
}

let datosApi = new Productos(db)



//PETICIONES....

//Muestra todos los productos
app.get('/api/productos/listar',(req,res)=>{
    res.json(datosApi.leer())
})
//Muestra un producto segun el parametro pasado por URL
app.get('/api/productos/listar/:id',(req,res)=>{
    let id = req.params.id;
    res.json(datosApi.leerProducto(id))
})

//Se guarda un producto nuevo segun los valores pasados por URL.
//Por medio de la url se pasan los valores: Ejemplo... 
//http://localhost:8080/api/productos/guardar?title=telefono&price=15000&thumbnail=telefono
app.post('/api/productos/guardar',(req,res)=>{ 
    let producto = req.body;
    res.json(datosApi.guardar(producto));
})

//DESAFIO 9:

const routerActualizar = router.put('/actualizar/:id',(req,res)=>{
    db.filter((product)=>{
        if(product.id == req.params.id){
            product.title = req.query.title,
            product.price = req.query.price,
            product.thumbnail = req.query.thumbnail
        }else{
            'No se ha encontrado el producto.'
        }
    });

    res.send('Se modifico el producto: '+ db[req.params.id].title);

});
app.use('/api/productos/', routerActualizar);

const routerEliminar = router.delete('/borrar/:id',(req,res)=>{
    db = db.filter((product)=>{
        if(!product.id == req.params.id){
            return product;
        }
    })
    res.send('Se ha eliminado el producto');
})
app.use('/api/productos/',routerEliminar);

