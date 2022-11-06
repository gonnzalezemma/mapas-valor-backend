const validacion = {};
const { body, check, param } = require("express-validator");
const validar_campos = require("../helpers/validar_campos");

const {
  ExisteEmail,
  ValidarPassword,
} = require("../helpers/validaciones.help");



validacion.validarRutaLogin = [
    body("email", "El email ingresado no contiene un formato correcto")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 25 }),
    body("password", "El password ingresado no contiene un formato correcto")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 50 }),
  ];
  
  validacion.validarCreateUser = [
    body("email", "El email ingresado no contiene un formato correcto")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 25 }),

    validar_campos,
  ];
  
  validacion.validarEditUserAdm = [
    body("email", "El email ingresado no contiene un formato correcto")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 8 }),
    body("password", "El password ingresado no contiene un formato correcto")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 8 }),
    body("tipoRole", "El tipo ingresado no contiene un formato correcto")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 8 }),
    validar_campos,
  ];
  validacion.validarEditUserUser = [
    body("email", "El password ingresado no contiene un formato correcto")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 8 })
      .custom(ExisteEmail),
    body("password", "El password ingresado no contiene un formato correcto")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 8 })
      .custom(ValidarPassword),
  
    validar_campos,
  ];
  

  




module.exports = validacion;
