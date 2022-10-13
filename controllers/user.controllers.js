const ctrlUsuarios={};

const Usuario =require('../models/Users');
const bcryptjs = require('bcryptjs');
const {generate_jwt}= require('../helpers/generate_jwt');
const { where } = require('sequelize');

/* 
? GET usuarios
*Mostrar usuarios 
 */
ctrlUsuarios.mostrarUsers = async (req, res)=>{
    try {
        const projects = await Usuario.findAll({
            atributes: ["id", "email","password","activo","role"],
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
/* 
? POST 
*create user with sequelize
 */
ctrlUsuarios.crearUsers = async (req, res)=>{
    const {email, password} = req.body;

    const salt = bcryptjs.genSaltSync();
    
    const pass = bcryptjs.hashSync(password,salt )
    
    const newUser = await Usuario.create({email, password:pass, activo:true,role:"user"},{
    fields:["email","password","activo","role"]}

)


await newUser.save();

    
res.json({
    msg:"User create user successfully"
});
}
/* 
? POST
* Iniciar session  sequelize
*/
ctrlUsuarios.rutaLogin = async(req, res)=>{

    const {email, password}=  req.body;

    const user =await Usuario.findOne({where:{email:email}}) 



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
     

// todo verificar contrasenia
    const passwordTrue = bcryptjs.compareSync(password,user.password)

    if(!passwordTrue){
        return res.status(401).json({msg:'contrasena invalida'})
    }

    //generar token
    const token = await generate_jwt(user.id);

    res.json({msg:'inicio de session exitoso',
              token:token})

};
/*     
todo: 
* Edit user
 */
ctrlUsuarios.rutaPut = async (req , res)=>{

    const { id } = req.params;

        const usuario = await Usuario.findByIdAndUpdate(id, {email, password});
        return res.json(usuario)


};

/* 
todo: PUT delete logical User
!ruta eliminar users

 */
ctrlUsuarios.rutaDelete = async (req,res)=>{

    const {id} = req.params;

    const user =await Usuario.update({role:false},{where:{id:id}
    });

    
    //responde si fue eliminado correctamente

    return res.status(201).json({
        msg: "user removido logicamente", user
    })
}

module.exports = ctrlUsuarios;