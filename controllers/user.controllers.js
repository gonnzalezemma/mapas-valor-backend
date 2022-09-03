const ctrlUsuarios={};

const Usuario =require('../models/users');
const bcryptjs = require('bcryptjs');
const {generate_jwt}= require('../helpers/generate_jwt')

//route show users

ctrlUsuarios.rutaLoginAdmin = async(req, res)=>{

    const {email, password}=  req.body;
    const user =await Usuario.findOne({email})

    if(!user){
        return res.status(401).json({
            message: 'No existe:',
            email:email
        })
    }
    if(!user.activo){
        return res.status(401).json({
            message: 'No existe',
            email:email
        })
    }
    if(!user.role){
        return res.status(401).json({
            message: 'No tiene permisos',
            email:email
        })
    }
    //verify password
    const passwordTrue =bcryptjs.compareSync(password,user.password)
    if(!passwordTrue){
        return res.status(401).json({msg:"Password unvaliable"})
    }

    //token generator
    const token =await generate_jwt(user.id);

    res.json({msg:" inicio de session exitoso", token:token})

}

ctrlUsuarios.rutaLogin = async(req, res)=>{

    
    if(!user){
        return res.status(401).json({
            mensaje:"No existe:",
            email: email
        })
    }
    console.log(user.activo)
   
    if(!user.activo){
        return res.status(401).json({
            mensaje:"No existe:1",
            email: email
        })
    }
     

//verificar contrasenia
    const passwordTrue = bcryptjs.compareSync(password,user.password)

    if(!passwordTrue){
        return res.status(401).json({msg:'contrasena invalida'})
    }

    //generar token
    const token = await generate_jwt(user.id);

    res.json({msg:'inicio de session exitoso',
              token:token})

};


//ruta agregar users
ctrlUsuarios.rutaPost = async (req,res)=>{
     
    const {email, password} = req.body;

    const user =new Usuario({email,password,role:"user"});
    
    //password salt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    await user.save();

    res.json({msg: 'Usuario agregado'})
};


//ver usuarios
ctrlUsuarios.rutaGet = async (req,res)=>{

    const user = await Usuario.find();

    res.json(user);
}


//ruta editar users
ctrlUsuarios.rutaPut = async (req , res)=>{

    const { id } = req.params;

        const usuario = await Usuario.findByIdAndUpdate(id, {dni, password});
        return res.json(usuario)


};


//ruta eliminar users
ctrlUsuarios.rutaDelete = async (req,res)=>{

    const {id} = req.params;

    const user =await Usuario.findByIdAndUpdate(id,{ activo: false });

    
    //responde si fue eliminado correctamente

    return res.status(201).json({
        msg: "user removido logicamente", user
    })
}

module.exports = ctrlUsuarios;