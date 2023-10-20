require("dotenv").config()
const bodyParser = require('body-parser');

const express = require('express')

const cors = require('cors')
const app =  express()
app.use(express.json())
// var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


const PORT = 5000
const products_routes=require("./routes/products")
const connectDB = require('./db/connect')
// app.get("/",(req,res)=>{
//     res.send("hii i am live")
// })

app.use(cors())
app.use("/api/products",products_routes)
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

const statr = async()=>{
try{
    await connectDB(process.env.MONGODB_URL)

    app.listen(PORT,()=>{
       console.log( `${PORT } is runnig `)
    })
}
catch(error){ 
    console.log(error)
}

}


statr()