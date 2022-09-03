const router = require('express').Router();

const {body, check}= require('express-validator')

const {validar_jwt} =require('../middlewares/validar_jwt')


//controllers 
const {
    rutaPost,rutaLogin,rutaDelete,rutaGet,rutaPut
}= require('../controllers/user.controllers')

//route login
router.post('/login/usuarios', rutaLogin)

//route agregar usuarios
router.get('/usuarios/get-user',rutaGet)

//route add user
router.post('/usuarios/create-user',rutaPost)

//route edit user
router.put('/usuarios/edit-user/:id',rutaPut)

//route logical delete user
router.delete('/usuarios/delete-user/:id',rutaDelete)



module.exports=router;
