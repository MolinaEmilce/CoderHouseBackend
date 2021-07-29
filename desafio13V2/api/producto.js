class Producto {

    constructor() {
        this.productos = [];
    }

    listar() {
            if(this.productos.length <= 0 ){
                return {error : 'No hay productos cargados'}
            }else{
                return this.productos;
            }
    }

    leerId(id){
        let productoID = this.productos.filter((product)=>{
            return product.id == id;
        });
        if(!productoID.length == 0){
            return productoID
        }else{
            return {error : 'No se ha encontrado el producto'}
        }
    }

    guardar(producto) {
        producto.id = this.productos.length + 1;
        return this.productos.push(producto);
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

    borrar(id) {
        let index = this.productos.findIndex(p => p.id === id);
        return this.productos.splice(index, 1);
    }
}

module.exports = new Producto();