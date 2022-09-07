const Usuario = require('../models/users');

const ExisteEmail = async( req, res, next ) => {
    const {email}=  req.body;
    const emailEncontrado = await  Usuario.findOne({email});

    if(emailEncontrado){
        return res.status(401).json({
            message: 'Email ya esxiste',
            email:email
        })
    }
    next()
}

module.exports = {
    ExisteEmail 
}