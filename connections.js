/* const mongoose = require('mongoose');
    require('dotenv').config();
mongoose
    .connect(process.env.ATLAS)
    .then(()=>console.log('DATABASE CONNECTED'))
    .catch((err)=> console.log(`ERROR CONNECTING TO DATA BASE: ${err}`));
 */

const Sequelize = require("sequelize");



 const sequelize = new Sequelize(process.env.NAME_SERVERDATA, process.env.NAME_DB, process.env.PASSDB, {
  host: process.env.HOST_DATABASE,
  dialect: process.env.DIALECT_DB,
});


const db= async ()=>{
try {
        await sequelize.sync({force:false});

    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
db();
module.exports = {sequelize}