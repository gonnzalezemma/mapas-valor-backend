const router = require('express').Router();

const {body, check}= require('express-validator')

const {validar_jwt} =require('../middlewares/validar_jwt')
const {validarUser} = require('../middlewares/validarUser')
const {ExisteEmail} = require('../middlewares/validar_email')
//mirar que cambio ja
//controllers 
const {
    // rutaPost,
    rutaLogin,
    rutaDelete,
    //!rutaGet,
    rutaPut,
    mostrarUsers,
    crearUsers
}= require('../controllers/user.controllers')

router.post('/crearuser',crearUsers)



// ? POST route login
 router.post('/login/usuarios', rutaLogin)

// ? POST route ver usuarios
 router.get('/usuarios/get-user',mostrarUsers)

// ? POST  route add user
  router.post('/usuarios/create-user',ExisteEmail,crearUsers)

// todo: Route edit user
//* edit user
router.put('/usuarios/edit-user',validar_jwt,rutaPut)

// TODO: route logical delete user
//! logical Delete
router.put('/usuarios/delete-user/',validar_jwt,rutaDelete)



module.exports=router;
