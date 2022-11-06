const ctrlDatosParcela = {};

const {DatosParcela, Registros, NombreServicios,Parcela} =require('../models/SequelizeModels');


ctrlDatosParcela.addDatosParcela = async (req, res)=>{
   const{latitud,longitud, valor,TipoId}= req.body;

    const idRegistro =  req.params.idRegistro;

    const coordenada = {
        type: "Point",
    coordinates: [latitud, longitud],
    crs: { type: "name", properties: { name: "EPSG:4326" } }
    }

    await DatosParcela.create({
        RegistroId:idRegistro,
        NombreServiciosId:TipoId,
        coordenada: coordenada,
        valor:valor
    })


    return res.status(200).json({ 
        msg:"Dato cargado correctamente"

    })
}

ctrlDatosParcela.editDato = async (req, res)=>{
    
    const {}= req.body;
    
    const id = req.params.idDato;
    
    const datos = await DatosParcela.update({where: {id: id}})
    
}

ctrlDatosParcela.mostrarDatosRegistro = async (req, res)=>{

    const registroId = req.params.id;
    
    const datosParcela = await DatosParcela.findAll({include: { all: true } },{where: {RegistroId: registroId}})



    res.status(200).json({

        datosParcela
    })
}




module.exports = ctrlDatosParcela;