let {Router}= require("express")
let {check,validate}= require("express-validator")
let {register}= require("../controller/user.controller")
let router = Router()


router.post("/signup",[
    check("fullname.firstname").notEmpty().isLength({min:3}).withMessage("firstname must be atleast 3 characters long"),
    check("email").notEmpty().isEmail().withMessage("email is required"),
    check("password").notEmpty().isLength({min:6}).withMessage("password must be atleast 6 characters long"),
],register)
module.exports=router