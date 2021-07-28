
let db = [
    {
        title : 'Calculadora',
        price : 1212,
        thumbnail : 'https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Finance-256.png',
        id:1
    },
];

class Productos{
    constructor(producto){
    //Inicializa variables
        this.producto = producto //Base de datos
    }

//Metodos requeridos
    leer(){
       if(this.producto.length <= 0 ){
           return {error : 'No hay productos cargados'}
       }else{
           return this.producto;
       }
    }
    leerId(id){
        let productoID = this.producto.filter((product)=>{
            return product.id == id;
        });
        if(!productoID.length == 0){
            return productoID
        }else{
            return {error : 'No se ha encontrado el producto'}
        }
    }
     guardar(producto){
         const newProducto = {
            id: this.producto.length + 1,
            title : producto.title,
            price : producto.price,
            thumbnail : producto.thumbnail
         }
        this.producto.push(newProducto);
        return newProducto;
    }
    actualizar(producto,id){
        //Si existe el id pasado
        let productExist = this.producto.filter(product =>{
            if(product.id == id){
                return product
            }
        });
        if(productExist.length == 0){
            return {error : 'No se ha encontrado el producto'}
        }else{
            //Modifica el producto desde la base de datos
            this.producto.map(product=>{
                if(product.id == id){
                    product.title = producto.title;
                    product.price = producto.price;
                    product.thumbnail = producto.thumbnail;
                }
            })
        }
    }
    eliminar(productId){
        let productExist = this.leerId(productId);
        if(productExist.error){
            return productExist.error;
        }else{
          this.producto = this.producto.filter(product=>product.id != productId);
          return `Se eliminó el id: ${productId}`
        }
        
    }

}
//Se exporta una instancia de la clase...
let productos = new Productos(db);

module.exports = productos;