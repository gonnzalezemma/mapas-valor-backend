const crtlRegistros ={};

const {Registros, Perfil}= require("../models/SequelizeModels")

crtlRegistros.addRegistro =async (req, res)=>{
    
    const{descripcion}= req.body;
    
    const idParcela = req.params.idParcela;

    if(!idParcela){
        return res.status(400).json({msg:"Parcela no definida"})
    }
    
    if(!descripcion){
        return res.status(400).json({msg:"La descripcion no puede estar vacia"})
    }
    
    const newRegistro = await Registros.create({
        ParcelaId:idParcela,
        descripcion:descripcion
    })
    
    return res.status(200).json({
        msg: "Registro creado exitosamente", 
        registro: newRegistro
    })
}


crtlRegistros.editRegistro =async (req, res)=>{
    
    const idRegistro = req.params.idRegistro
    
    const{descripcion}= req.body;
    
    const registro = await Registros.findOne({where:{id:idRegistro}})
    
    if(!registro){
        return res.status(404).json({msg:"registro no encontrado"})
    }
    await Registros.update({descripcion:descripcion},{where:       {id:idRegistro}})
    const updateRegistro = await Registros.findOne({where:{id:idRegistro}})
    
    
    return res.status(201).json({
        msg:"Registro actualizado correctamente",
        updateRegistro
    })
}


crtlRegistros.deleteRegistro =async (req, res)=>{

   const idRegistro= req.idRegistro

    
    const registro = await Registros.findOne({active:true},{where:{id:idRegistro}})
    
if(!registro){
    return res.status(400).json({msg:"Registro no existe"})
}

    await Registros.update({active:false},{where:{id:idRegistro}})

    return res.status(200).json({
        msg:"registro eliminado correctamente"
    })
}

crtlRegistros.verRegistrosParcela = async (req, res)=>{
    
    const idParcela = req.params.idParcela
    
    const registro = await Registros.findOne({where:{active:true, parcelaId:idParcela}})
    
    if(!registro){
        return res.status(400).json({msg:"Registro no existe"})
    }
    return res.status(200).json({
        registro
    })
}

crtlRegistros.verRegistros = async (req, res)=>{
    
    const idUser = req.Usuario.id;
    
    const {id} = await Perfil.findOne({where:{PerfilUserId:idUser}}) 
    
    const RegistrosParcelas = Registros.findAll({where:{PerfilId:id}})
    
    
    return res.status(200).json({
        RegistrosParcelas
    })
}


module.exports = crtlRegistros







