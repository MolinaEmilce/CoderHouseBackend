const socket = io.connect(); //Se conecta el socket

socket.on('mensajes', data => {
    //RECIBIENDO DATOS DEL SERVIDOR....
    console.log(data)
    //Al tener la data del servidor lo visualizamos en la  render..
    render(data)
})


//Funcion para crear el html e inyectarlo en el div del archivo html
function render(data){
    //Map: crea un nuevo arreglo, y por cada elemento devuelve un string,  se junta en un string grande(pero queda muy desprolijo y feo), entonces para eso se usa join
    let html = data.map(mje =>{
        return (`
            <p> 
                <strong class= "autor_txt">${mje.autor}</strong> :
                <span class="txt_contenido">${mje.texto}</span>
            </p>
            `)
    }).join(' '); //Join =  lo junta los elemetnos del arreglo y lo convierte en un string, separado por espacio ' ' que en si baja un elemento tras otro .

    //Agarra el elemento del archivo index.html y le incrusta/inyecta lo que trae de la funcion render.
    document.getElementById("mensajes").innerHTML = html
}


//Funcion de capturacion de los valores de los elementos html, para así MANDARLOS AL SERVIDOR.
function addMensaje(event){
    let mensaje = {
        autor :  document.getElementById('username').value != '' ? document.getElementById('username').value  : 'Anonimo',
        texto : document.getElementById('texto').value != '' ? document.getElementById('texto').value : 'Sin contenido'
    }

    //VA A ENVIAR AL SERVIDOR
    socket.emit('nuevo-mensaje', mensaje);
    return false; //Recomendado, para que la funcion devuelva algo, xq en si las funciones siempre tienen que devolver o recibir algo
}