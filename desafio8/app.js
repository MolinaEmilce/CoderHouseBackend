const { text } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
        let id = this.data.length + 1;
        let newProducto = [producto].push({id}) ;
        return newProducto;
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
    let producto = {
        title : req.query.title,
        price : req.query.price,
        thumbnail : req.query.thumbnail
    }
    res.json(datosApi.guardar(producto));
})