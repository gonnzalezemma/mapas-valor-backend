const mongoose = require('mongoose');
    require('dotenv').config();
mongoose
    .connect(process.env.ATLAS)
    .then(()=>console.log('DATABASE CONNECTED'))
    .catch((err)=> console.log(`ERROR CONNECTING TO DATA BASE: ${err}`));
