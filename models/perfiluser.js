//const {model, Schema}= require('mongoose');

const PerfilShema = new Schema({
    
    nombre:{
        type: String,
        required:true
        },
    apellido:{
        type: String,
        required:true
        },
    celular:{
        type: String,
        required:true
       },
    direccion:{
    type: String,
    required:true
                
        },
    dni:{
        type: String,
        required:true
    },
    ocupacion:{
        type: String,
        required:true
    },    
    lugaresInteres:{
        type: String,
        required:true
        //Provincias de donde le gustaria tener mas informacion.    
    },
    organizacion:{
        type: String,
        required:true
    },
    funcionOrganizacion:{
        type: String,
        required:true
    }
    
});
module.exports = model('Perfil', PerfilShema);