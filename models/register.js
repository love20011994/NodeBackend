const mongoose=require("mongoose")
const empolyeeSchema= new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    lastName:{
        type:String,
        // required:true
    },
    
    gender:{
        type:String,
        // required:true,
    },
    age:{
        type:String,
        // required:true,
    },
     email:{
        type:String,
        // required:true,
        // unique:true
    },
    phoneNumber:{
        type:String,
        // required:true,
        // unique:true
    },
    password:{
        type:String,
        // required:true,
    },
     confirmPassword:{
        type:String,
        // required:true,
    },
})

module.exports =  mongoose.model("Register",empolyeeSchema)