const router = require('express').Router();

const {validar_jwt} =require('../middlewares/validar_jwt')
/* 
*controllers
*/

const {
    agregarServicio,
    editarServicio,
    verServicios
} = require('../controllers/nombreServicios.controllers')

/* 
?POST
*agregar servicio
*/
router.post('/servicio',validar_jwt,agregarServicio)
/* 
todo : PUT  
*edit servicio
*/
router.put('/servicio/:idServicio', validar_jwt,editarServicio)

/* 
*GET      
*ver todos los servicios del usuario
*/

router.get('/servicios', validar_jwt,verServicios)

module.exports=router;