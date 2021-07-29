
socket.on('messages', function(data) { 
    console.log(data);
    render(data);
  });
  
  function render(data) { 
      var html = data.map(function(elem, index){ 
        return(`
              <div>
                  <b style="color:blue;">${elem.author}</b> 
                  [<span style="color:brown;">${elem.fyh}</span>] : 
                  <i style="color:green;">${elem.text}</i>
              </div>
          `) 
      }).join(" "); 
      document.getElementById('messages').innerHTML = html; 
  }
  
  const userCentroMensajes = document.getElementById('username')
  const textoCentroMensajes = document.getElementById('texto')
  const botonCentroMensajes = document.getElementById('enviar')
  
  function addMessage(e) { 
      let hoy = new Date();
      var mensaje = { 
        author: userCentroMensajes.value, 
        text: textoCentroMensajes.value,
        fyh : hoy.getDate() + '-' + hoy.getMonth() + '-' + hoy.getFullYear()+'/' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
      }; 
      socket.emit('new-message', mensaje); 
  
      textoCentroMensajes.value = ''
      textoCentroMensajes.focus()
  
      botonCentroMensajes.disabled = true
    
      return false;
  }
  
  userCentroMensajes.addEventListener('input', () => {
      let hayEmail = userCentroMensajes.value.length
      let hayTexto = textoCentroMensajes.value.length
      textoCentroMensajes.disabled = !hayEmail
      botonCentroMensajes.disabled = !hayEmail || !hayTexto
  })
  
  textoCentroMensajes.addEventListener('input', () => {
      let hayTexto = textoCentroMensajes.value.length
      botonCentroMensajes.disabled = !hayTexto
  })