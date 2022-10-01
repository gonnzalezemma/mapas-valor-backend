const router = require('express').Router();

const {body, check}= require('express-validator')

const {validar_jwt} =require('../middlewares/validar_jwt')
const {validarUser} = require('../middlewares/validarUser')
const {ExisteEmail} = require('../middlewares/validar_email')
//mirar que cambio ja
//controllers 
const {
    // rutaPost,rutaLogin,rutaDelete,rutaGet,rutaPut,
    crearUsers
}= require('../controllers/user.controllers')

router.post('/crearuser',crearUsers)



// //route login
// router.post('/login/usuarios', rutaLogin)

// //route agregar usuarios
// router.get('/usuarios/get-user',rutaGet)

// //route add user
// router.post('/usuarios/create-user',ExisteEmail,rutaPost)

// //route edit user
// router.put('/usuarios/edit-user/:id',validar_jwt,rutaPut)

// //route logical delete user
// router.delete('/usuarios/delete-user/:id',rutaDelete)



module.exports=router;
