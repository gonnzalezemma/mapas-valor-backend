const router = require('express').Router();

const {validar_jwt} = require('../middlewares/validar_jwt')

/* 
* controllers
*/
const {
    addRegistro,
    editRegistro,
    deleteRegistro,
    verRegistrosParcela,
    verRegistros
}= require('../controllers/registros.controllers');

/* 
?POST
*agregar registro
*/

router.post('/registros/agregar/:idParcela', validar_jwt,addRegistro)

/* 
todo Edit
*agregar registro
*/

router.put('/registros/:idRegistro', validar_jwt,editRegistro)


/* 
todo put
!Delete registro
*/
router.put('/registros/:idRegistro', validar_jwt,deleteRegistro)


/* 
? GET mostrar todas las parcelas
*/
router.get('/registros/:idParcela', validar_jwt,verRegistrosParcela)


/* 
? GET mostrar todas las parcelas
*/
router.get('/registros', validar_jwt,verRegistros)


module.exports=router;



