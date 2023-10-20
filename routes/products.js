
const express = require('express')

const router  = express.Router()

const {
    getAllProducts,
    getAllProductsTesting,
    postAllProducts,
    deleteOneProduct,
    postdatabyId,
    registerDatapost,
    loginDatapost,
    logoutDatapost,
    checkout,
    paymentVerification,
    updateapi}=require("../controllers/products")

router.route('/getData').get(getAllProducts)

router.route('/testing').get(getAllProductsTesting)

router.route('/postdata').post(postAllProducts)

router.route('/deletedata').post(deleteOneProduct)

router.route('/postdatabyid').post(postdatabyId)

router.route('/editapi').post(updateapi)

router.route('/register/postapi').post(registerDatapost)
router.route('/login/postapi').post(loginDatapost)
router.route('/logout/postapi').post(logoutDatapost)
router.route("/checkout").post(checkout)
router.route('/paymentVerification').post(paymentVerification)






module.exports=router
