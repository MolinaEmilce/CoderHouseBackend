const express = require('express');
const app = express();
const fs = require('fs');

let contItems=0;
let contItem=0;
const puerto = 8080;

const db =   JSON.parse(fs.readFileSync('./productos.txt','utf-8'))

let servidor = app.listen(puerto,()=>{
    console.log(`Puerto corriendo en http://localhost:${puerto}`)
})
servidor.on('error', error =>console.log(`Error en el servidor: ${error}`))


//PETICIONES HTTP
app.get('/',(req,res)=>{
    res.send('Bienvenido')
})
app.get('/items',(req,res)=>{
    contItems++;
  let items = {
      items : db,
      cantidad : db.length
  }
  res.json(items)
})

app.get('/item-random',(req,res)=>{
    contItem++;
    let numMax = db.length;
    let numRandom = Math.floor(Math.random() * ((numMax+1) - 0) + 0);
    res.json({item : db[numRandom]})
    res.end()
})

app.get('/visitas',(req,res)=>{
    res.json({
        visitas: {
            items : contItems,
            item : contItem
        }
    })
})