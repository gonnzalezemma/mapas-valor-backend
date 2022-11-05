const router = require('express').Router();


const {validar_jwt} =require('../middlewares/validar_jwt')
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

const { 
  validarRutaLogin,
  validarCreateUser,
  //validarEditUserAdm,
  validarEditUserUser

} = require("../middlewares/validaciones");

router.post('/crearuser',crearUsers)



// ? POST route login
 router.post('/login/usuarios',validarRutaLogin, rutaLogin)

// ? POST route ver usuarios
 router.get('/usuarios/get-user',mostrarUsers)

// ? POST  route add user
  router.post('/usuarios/create-user',validarCreateUser,crearUsers)

// todo: Route edit user
//* edit user
router.put('/usuarios/edit-user',validarEditUserUser,validar_jwt,rutaPut)

// TODO: route logical delete user
//! logical Delete
router.put('/usuarios/delete-user/',validar_jwt,rutaDelete)



module.exports=router;
