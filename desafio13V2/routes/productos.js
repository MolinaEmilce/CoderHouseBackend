const express = require('express');
const router = express.Router();
const productos = require('../api/producto');


router.get('/productos/vista', (req, res) => {
    let prods = productos.listar();
    res.render('lista', { productos: prods});
});

router.get('/productos/vista/:id', (req, res) => {
    let { id } = req.params;
    res.render('lista',{productos: productos.leerId(id)});
});

router.post('/productos/guardar', (req, res) => {
    let producto = req.body;
    res.json(productos.guardar(producto));
});

router.put('/productos/actualizar/:id',(req,res)=>{
    let productQuery = req.query;
    let idProduct = req.params.id
    let rta = productos.actualizar(productQuery,idProduct)
    res.json(rta);
})

router.delete('/productos/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.borrar(id));
});

module.exports = router;