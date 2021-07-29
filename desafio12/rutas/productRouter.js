

const express = require('express');
const router = express.Router();

const productos = require('../controlador/productController');

//Vista de la tabla de productos
router.get('/vista',(req,res)=>{
    res.render('/views/lista',{productos: productos.leer()});
})
//Vista de la tabla de UN producto
router.get('/vista/:id',(req,res)=>{
    let id = req.params.id;
    let resultado = productos.leerId(id);
    res.render('lista',{productos: resultado});
})
//Accion de guardar producto
router.post('/guardar',(req,res)=>{
    productos.guardar(req.body)
    res.render('form')
})
//Accion de modificar un producto
router.put('/actualizar/:id',(req,res)=>{
    let productQuery = req.query;
    let idProduct = req.params.id
    let rta = productos.actualizar(productQuery,idProduct)
    res.json(rta);
})
router.delete('/eliminar/:id',(req,res)=>{
    let idProduct = req.params.id;
    let rta =  productos.eliminar(idProduct);
    res.json(rta)
})


