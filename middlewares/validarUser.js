const { body, check } = require('express-validator');
const { ExisteEmail } = require('../middlewares/validar_email');
const validarUser=[


    body('email', 'el correo ingresado no contiene un formato correcto')
        .isEmail()
        .not()
        .isEmpty()
        .custom(ExisteEmail),
    
     body('password', 'El password ingresado no contiene un formato correcto')
    .isString()
    .not()
    .isEmpty()

]

module.exports = {
    validarUser
}