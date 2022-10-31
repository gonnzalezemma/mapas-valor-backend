

const Sequelize = require("sequelize");



 const sequelize = new Sequelize(process.env.NAME_SERVERDATA, process.env.NAME_DB, process.env.PASSDB, {
  host: process.env.HOST_DATABASE,
  dialect: process.env.DIALECT_DB,
  logging: false
});


const db= async ()=>{
try {
        await sequelize.sync({force:false});
        console.log("database connect")
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
db(); 
module.exports = {sequelize}