// import Razorpay from "razorpay";

require("dotenv").config()
const bodyParser = require('body-parser');

const express = require('express')

const cors = require('cors')
const app =  express()
app.use(express.json())
const Razorpay = require('razorpay')

// var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


const products_routes=require("./routes/products")
const connectDB = require('./db/connect')
// app.get("/",(req,res)=>{
//     res.send("hii i am live")
// })

app.use(cors())
app.use("/api/products",products_routes)
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

//RAZOR PAY
   

const statr = async()=>{
try{
    await connectDB(process.env.MONGODB_URL)

    app.listen(process.env.PORT,()=>{
       console.log( `${process.env.PORT } is runnig `)
    })
}
catch(error){ 
    console.log(error)
}

}


statr()