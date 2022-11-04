const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errores = { errors: errors.array() }

        return res.status(400).json(errores.errors[0]);
    }

    next();
}


module.exports = validarCampos;