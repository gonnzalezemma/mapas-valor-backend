//const {model, Schema}= require('mongoose');
const {DataTypes}= require('sequelize')
const {sequelize} =require('../connections')

const Usuario = sequelize.define(
    'Perfil',{
    id:{
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    userId: { 
        type: DataTypes.BIGINT(11), 
        field: 'user_id',
        unique: true, 
        references: {
          model: 'Usuarios',
          key: 'id'
        }
    },
    nombre:{
        type: DataTypes.STRING,
        required:true
    }
    ,
    apellido:{
        type: DataTypes.STRING
    }
    ,
    celular:{
        type: DataTypes.STRING
    }
    ,
    direccion:{
        type: DataTypes.STRING
    }
    ,
    ocupacion:{
        type: DataTypes.STRING
    }
    ,
    lugarInteres:{
        type: DataTypes.STRING
    }
    ,
    organizacion:{
        type: DataTypes.STRING
    }
    ,
    funcionOrganizacion:{
        type: DataTypes.STRING
    }
       
},{
    
      underscored: true,
      timestamps: true,
      tableName: 'Perfil',
           comentario: 'Perfil Usuario',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      indexes: [{
        name: 'Perfil_userId',
        method: 'BTREE',
       fields: ['user_id']
      }]

}
);


module.exports = ("Usuarios", Usuario);
