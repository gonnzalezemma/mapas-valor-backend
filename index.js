//requires
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//settings


//initialization
const app = express();
require('dotenv').config();
require('./connections')

//middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//conection server

app.set('port', process.env.PORT || 5000) //port conection

//routes server

app.use(require('./routes/user.routes'));

app.listen(app.get("port"),()=>
    console.log(`server on port ${app.get("port")}`)
);