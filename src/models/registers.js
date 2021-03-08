const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    phone :{
        type:Number,
        required : true,
        unique : true
    },
    gender :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique: true
    },
    password :{
        type: String,
        required : true,
    },
    room :{
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    }
});

//now need to create a collection//here registeration in the collection name of db not file hbs name
const Registration = new mongoose.model("Registration",customerSchema);
module.exports = Registration;