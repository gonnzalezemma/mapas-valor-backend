const {Usuario} = require('../models/SequelizeModels');

const ExisteEmail = async( req, res, next ) => {
    const {email}=  req.body;
    const emailEncontrado = await  Usuario.findOne({ where:{email:email}});

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