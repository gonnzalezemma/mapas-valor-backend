const ctrlPerfilUsuarios={};


const Perfil =require('../models/PerfilUser');
const bcryptjs = require('bcryptjs');
const {generate_jwt}= require('../helpers/generate_jwt')


//controlador para agregar datos
ctrlPerfilUsuarios.agregarDatos = async(req, res)=>{
    const {nombre, apellido, celular,direccion,ocupacion,lugaresInteres,organizacion, funcionOrganizacion
    }=  req.body;

    const userId= req.usuario.id;

    const perfil= await Perfil.create({userId:userId,nombre:nombre, apellido:apellido, celular:celular,direccion:direccion,ocupacion:ocupacion,lugarInteres:lugaresInteres,organizacion:organizacion, funcionOrganizacion:funcionOrganizacion})

    return res.status(201).json({
        msg:"usuario Agregado exitosamente",
        Perfil: perfil
    })
}

//mostrar informacion de usuario
ctrlPerfilUsuarios.rutaMostrarInformacion = async(req,res)=>{
    const userId= req.params.id;
    console.log(userId);
    const perfilUsuario = await Perfil.findOne({where:{userId:userId}})
console.log(perfilUsuario)
    res.json(perfilUsuario);
}

module.exports = ctrlPerfilUsuarios;