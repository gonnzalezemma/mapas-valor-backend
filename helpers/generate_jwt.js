const jwt = require('jsonwebtoken');
require("dotenv").config();
const generate_jwt = (id = '') => {

    return new Promise((resolve, reject) => {

        //identifica el usuario

        const payload = {
            id
        }

            // utiliza el SECRET_KEY para 
        jwt.sign(payload, process.env.SECRET_KEY,(error, token) => {

            if (error) {
                reject(`Error al generar token, error nro: ${error}`);
            }
            
            resolve(token);
        });


    });



};

module.exports ={
    generate_jwt
}