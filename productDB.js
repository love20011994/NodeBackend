require("dotenv").config()

const connectDB  = require("./db/connect")
const Product = require("./models/products")

const productJson = require("./product.json")

const start=async()=>{
console.log("hellodb")
    try{
        
        await connectDB(process.env.MONGODB_URL)
       await Product.create(productJson)

    }
    catch(err){
         console.log(err)
    }
}

start()