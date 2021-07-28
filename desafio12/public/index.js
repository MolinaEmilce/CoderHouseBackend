const socket = io.connect(); 

socket.on('mis productos', dataProduct=>{
   //Recibo la data del servidor..
    console.log(dataProduct)
})



//CAPTURA LOS VALORES DEL INPUT Y LOS MANDA AL SERVIDOR
const inputNombre = document.getElementsByName('title');
const inputPrice = document.getElementsByName('price');
const inputThumbnail = document.getElementsByName('thumbnail');
const button = document.querySelector('button');


button.addEventListener('click',()=>{
    const productAdd = {
        title : inputNombre[0].value,
        price : inputPrice[0].value,
        thumbnail : inputThumbnail[0].value
    }

    socket.emit('mis productos', productAdd);
})
