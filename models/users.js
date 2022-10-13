//const {model, Schema}= require('mongoose');
const {DataTypes}= require('sequelize')
const {sequelize} =require('../connections')

const Usuario = sequelize.define(
    'Usuarios',{
    id:{
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    email:{
        type: DataTypes.STRING,
        required:true
    },
    password:{
        type: DataTypes.STRING
    },
    activo:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
    },
    role:{
        type: DataTypes.STRING
    }
    
},
{
    timestamps: true,
    freezeTableName: true,
    tableName: 'Usuarios',
    charset: 'utf8',
    collate: 'utf8_general_ci'
}
);


module.exports = ("Usuarios", Usuario);
