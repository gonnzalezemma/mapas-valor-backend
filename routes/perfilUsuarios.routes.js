const router = require('express').Router();

const {body, check}= require('express-validator')

const {validar_jwt} =require('../middlewares/validar_jwt')

const {ExisteEmail} = require('../middlewares/validar_email')

//controllers 
const {
    rutaMostrarInformacion,agregarDatos,rutaEditPerfil

}= require('../controllers/perfilUsuarios.controllers')


router.get('/perfil/:id', rutaMostrarInformacion)


router.put('/perfil/',validar_jwt, rutaEditPerfil)

//route add user information with token 
router.post('/usuarios/agregar-perfil',validar_jwt,agregarDatos)




module.exports=router;