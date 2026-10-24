let { Router } = require("express")
let { check } = require("express-validator")
let { register, login, getUserProfile, logout } = require("../controller/user.controller")
let { authUser } = require("../middleware/auth.middleware")
let router = Router()


router.post("/signup", [
    check("fullname.firstname").notEmpty().isLength({ min: 3 }).withMessage("firstname must be atleast 3 characters long"),
    check("email").notEmpty().isEmail().withMessage("email is required"),
    check("password").notEmpty().isLength({ min: 6 }).withMessage("password must be atleast 6 characters long"),
], register)

router.post('/login', [
    check("email").notEmpty().isEmail().withMessage("email is required"),
    check("password").notEmpty().isLength({ min: 6 }).withMessage("password must be atleast 6 characters long"),
], login)
router.get("/profile", authUser, getUserProfile)
router.get("/logout", authUser, logout)
module.exports = router