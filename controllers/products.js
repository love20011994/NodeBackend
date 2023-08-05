
const Product = require("../models/products")
const Register=require("../models/register")
const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');
const jwtSecret = '1234';



const getAllProducts=async(req,res)=>{

    console.log(req.query,"kk")
    const{company,name}=req.query
    const objectQuery={}

    if(company){
        objectQuery.company=company
    }
    if(name){
        objectQuery.name=name

    }
          console.log(objectQuery,"kkkkkk")
        const apidata= await Product.find(objectQuery)
    res.send(apidata)
}

const getAllProductsTesting=async(req,res)=>{
    const apidata= await Product.find({name:"watch"})
     res.send({apidata})
     
}

const postAllProducts=async(req,res)=>{
    console.log(req.body,"postdata")
    await Product.create(req.body)
    
       res.send(req.body)
    //    console.log(req.body)
    // console.log("hiii")
}

const deleteOneProduct=async(req,res)=>{
 await Product.deleteOne(req.body)
}

const postdatabyId=async(req,res)=>{
    // console.log(req.body,"nodebodt")
  const editapidata=  await Product.findOne({_id:req.body})
  res.send(editapidata)


}

const updateapi=async(req,res)=>{
 
    const newData=req.body.newObject2[0]
    const newData1=req.body.newObject2[1]
console.log(newData1,"idididids")
    console.log(newData,"newData")
  const updateData=  await Product.updateOne({"_id":newData1._id},{$set:newData})
  res.send(updateData)
}

const registerDatapost=async(req,res)=>{
    console.log(req.body,"registerdata")
  try{await Register.create(req.body.formData)
    const email=req.body.formData.email
    console.log(req.body.formData.email,"jjjjjjjjjjjj")
    // console.log(email1,"kkkkkk")
    const resisterId=  await Register.findOne({email:email})
    console.log(resisterId,"resisterId")

     const tokenId=resisterId._id.toString()
    const token = jwt.sign(tokenId,"1234")
    console.log(token,"tokenjwt")
     
    res.status(201).send({"status":"success",
    "message":"Registration success",
    "token":token})}
    catch(err){
          console.log(err)
    }
}

const loginDatapost= async(req,res)=>{
    const email= req.body.email
    const password = req.body.password
    const token = req.headers.authorization.split(' ')[1]
    const verifyToken = jwt.verify(token,"1234")

    console.log(verifyToken,"tokeeeen")
  try{ 
    const loginData = await Register.findOne({_id:verifyToken})
    if(loginData.password===password){
        res.send("loginsuccess")
    }
    else{
        res.send ("invalid login")

    }
}
  catch(err){
    res.send ("invalid login")
  }    
     console.log(req.body)
}

const logoutDatapost=async(req,res)=>{
  console.log(req.body.logout,"req.body.logoutapidata")
     res.send(req.body.logout)
}


module.exports={
    getAllProducts,
    getAllProductsTesting,
    postAllProducts,
    deleteOneProduct,
    postdatabyId,
    updateapi,
    registerDatapost,
    loginDatapost,
    logoutDatapost
}