//const {model, Schema}= require('mongoose');
const {DataTypes}= require('sequelize')
const {sequelize} =require('../connections')

const Usuario = sequelize.define(
    'Usuarios',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING,
        required:true
    },
    password:{
        type: DataTypes.STRING
    },
    activo:{
        type: DataTypes.BOOLEAN
    },
    role:{
        type: DataTypes.STRING
    }
    
}
);


module.exports = ("Usuarios", Usuario);
// Project.hasMany(Task, {
//     foreinkey: "projectId",
//     sourceKey: "id",
//   });