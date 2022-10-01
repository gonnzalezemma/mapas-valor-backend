const router = require('express').Router();

const {body, check}= require('express-validator')

const {validar_jwt} =require('../middlewares/validar_jwt')

const {ExisteEmail} = require('../middlewares/validar_email')

//controllers 
const {
    rutaMostrarInformacion,agregarDatos
}= require('../controllers/perfilUsuarios.controllers')


router.post('/perfil/:id',validar_jwt, rutaMostrarInformacion)

//route add user information with token 
router.get('/usuarios/get-info/:id',validar_jwt,agregarDatos)




module.exports=router;