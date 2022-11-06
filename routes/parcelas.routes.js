const router = require('express').Router();

const {validar_jwt} = require('../middlewares/validar_jwt')

/* 
* controllers
*/

const {
    agregarParcelas,
    editarParcelas,
    verParcela,
    verParcelas,
    deleteParcelas

}= require('../controllers/parcelas.controllers')

router.post('/parcela', validar_jwt, agregarParcelas);

/* 
todo Edit parcela */

router.put('/parcela/:id', validar_jwt, editarParcelas);


/* 
? GET mostra parcelas
*/

router.get('/parcela/:parcelaid', validar_jwt, verParcela);


/* 
? GET mostrar todas las parcelas
*/

router.get('/parcela/todos', validar_jwt, verParcelas);

/* 
!Delete parcela
*/
router.get('/parcela/:id', validar_jwt, deleteParcelas);



module.exports=router;