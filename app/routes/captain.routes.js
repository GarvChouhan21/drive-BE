let express = require("express")
let { check } = require("express-validator")
let { register } = require("../controller/captain.controller")
let captainRoutes = express.Router()

captainRoutes.post('/register', [
    check("fullname.firstname", "firstname must be at least 3 characters").notEmpty().isLength({ min: 3 }),
    check("email", "Please enter a valid email").trim().notEmpty().isEmail(),
    check("password", "Please enter your password").trim().notEmpty().isLength({ min: 6 }),
    check("vehicle.color", "Please enter vehicle color").trim().notEmpty(),
    check("vehicle.plate", "Please enter vehicle plate").trim().notEmpty(),
    check("vehicle.capacity", "Please enter vehicle capacity").notEmpty().isInt({ min: 1 }),
    check("vehicle.vehicleType", "vehicleType must be car, motercycle or auto").isIn(['car', 'motercycle', 'auto']),
], register)


module.exports = captainRoutes
