const {model, Schema}= require('mongoose');
const UserShema = new Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    activo:{
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        required:true
    }
});

module.exports = model('Usuario', UserShema);