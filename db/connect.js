// PaF6nTO9rEFydBPE

const mongoose=require('mongoose')

// const uri = "mongodb+srv://kush:PaF6nTO9rEFydBPE@kal.bfg6bmx.mongodb.net/"

const connectDB =(uri)=>{

    console.log("connect to db");
    return mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

module.exports =connectDB