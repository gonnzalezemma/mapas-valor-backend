const crtlParcelas ={}

const {Parcelas,Perfil} = require('../models/SequelizeModels')

crtlParcelas.agregarParcelas = async (req, res)=>{

    const {nombreParcela,parcela}= req.body
    
        const userId = req.usuario.id;
         const {id} = await Perfil.findOne({where:{PerfilUserId: userId}}) 

    const poligono = {
        type: "Polygon",
        coordinates: parcela,
      };
    const verparcela =  await Parcelas.create({
          parcela:poligono,
          nombreParcela:nombreParcela,
          PerfilUserId:id
      })

 return res.status(200).json(verparcela)
}

crtlParcelas.editarParcelas = async (req, res)=>{

    const {nombreParcela,parcela}=req.body;
    const idParcela= req.params.id;

    const userId = req.usuario.id;
    
    const {id} =await Perfil.findOne({where:{PerfilUserId: userId}}) 
    
   const existe= await Parcelas.findOne({where:{ [Op.and]:[{id:idParcela},{PerfilUserId:id},{active:true}]}}) 


   if(!existe){
    return res.status(404).json({msg:"No existe"})
   }
    const poligono = {
        type: "Polygon",
        coordinates: parcela,
      };
    
   await Parcelas.update({nombreParcela:nombreParcela,parcela:poligono}, {where:{ [Op.and]:[{id:idParcela},{PerfilUserId:id}]}})

   const updateParcela = await Parcelas.findOne({where:{ [Op.and]:[{id:idParcela},{PerfilUserId:id}]}}) 
   
    return  res.status(201).json({updateParcela})
}



crtlParcelas.verParcelas = async (req, res)=>{

    const userId = req.usuario.id;

    const {id} =await Perfil.findOne({where:{PerfilUserId: userId}}) 

    const parcelasUser= await Parcelas.findAll({where:{ [Op.and]:[{active:true},{PerfilUserId:id}]}}) 

    if(!parcelasUser){
        return res.status(404).json({msg:"No se encontraron parcelas"})
    }
   return res.status(200).json(
    parcelasUser
   )
}
/* 
todo LOGICAL DELETE
*/
crtlParcelas.deleteParcelas = async (req, res)=>{

    const idParcela = req.params.id

    const userId = req.usuario.id;

    const {id} =await Perfil.findOne({where:{PerfilUserId: userId}}) 

    await Parcelas.update({active:false},{where:{ [Op.and]:[{id:idParcela},{PerfilUserId:id},{active:true}]}})

return res.status(200).json({msg:"Parcela eliminada perfectamente"})
}


module.exports =crtlParcelas;