
const Product = require("../models/products")
const Register=require("../models/register")
const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');
const jwtSecret = '1234';
const Razorpay = require('razorpay')
var crypto = require("crypto")




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
    const email=req.body?.formData?.email
    console.log(req.body?.formData?.email,"jjjjjjjjjjjj")
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

//send email through nodemailer

"use strict";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  // secure: true,
  // service: 'gmail',
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'colt.hane90@ethereal.email',
    pass: 'ePe7NPH1YjJSYfcQ6F'
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <kush.kalsangrah@gmail.com>', // sender address
    to: "love.kalsangrah@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Registration successful", // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);



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

const checkout = async(req,res)=>{
 try{

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
    })
  const options={
    amount:Number(req.body.amount*100),
    currency:"INR",
    receipt:"order_rcptid_11"
  }
  const order = await instance.orders.create(options)
  console.log(order,"zzzzzz")
  res.status(200).json({success:true,
             order   })
 }
 catch(err){ console.log(err)}
}

const paymentVerification= async(req,res)=>{
  console.log(req.body)

  const{razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature=crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                        .update(body.toString())
                                        .digest('hex')


const isAuthentic = expectedSignature===razorpay_signature
if(isAuthentic){
  res.redirect(
    `http://localhost:3000/paymentsucess`
  )
// data base come here
console.log("verify done")
}
else{res.status(501).json({
  success:false
  
 })}
 
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
    logoutDatapost,
    checkout,
    paymentVerification
    
}