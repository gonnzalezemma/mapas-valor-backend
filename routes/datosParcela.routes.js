const router = require('express').Router();

const {validar_jwt} = require('../middlewares/validar_jwt')


const {
    addDatosParcela,
    editDato,
    mostrarDatosRegistro

}= require('../controllers/datosParcela.controllers');



/* 

*/
router.post('/datosparcela/:idRegistro', validar_jwt, addDatosParcela);

/* 

*/
router.put('/datosparcela/:idDato', validar_jwt, editDato);


/* 

*/
router.get('/datos/registro/:id', validar_jwt, mostrarDatosRegistro);

module.exports=router;



module.exports=router;