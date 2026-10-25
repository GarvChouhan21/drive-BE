let captainService = require('../services/captain.service');
let { validationResult } = require('express-validator');
let captainModel = require('../model/captain.model');
let BlacklistToken = require('../model/blacklistToken.model');

module.exports.register = async (req, res) => {
    try {
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }
        let isExist = await captainModel.findOne({ email: req.body.email });
        if (isExist) {
            return res.status(400).json({ message: "captain already exists" })
        }
        let { fullname, email, password, vehicle } = req.body;
        let captain = await captainService.createCaptain({ fullname, email, password, vehicle });
        return res.status(200).json({ message: "captain created successfully", captain });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let captain = await captainModel.findOne({ email: email }).select("+password");
        if (!captain) {
            return res.status(404).json({ message: "captain not found" });
        }
        let isPasswordValid = await captain.comparePassword(password, captain.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "invalid password" });
        }
        let token = await captain.generateToken();
        return res.status(200).json({ message: "captain logged in successfully", token, captain });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.getCaptainProfile = async (req, res) => {
    try {
        let captain = await captainModel.findById(req.captain.id);
        return res.status(200).json({ message: "captain profile fetched successfully", captain });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.logout = async (req, res) => {
    try {
        let token = req.cookies.token || req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "unauthorised" })
        }
        let blacklistToken = await BlacklistToken.create({
            token: token
        });
        return res.status(200).json({ message: "captain logged out successfully", blacklistToken });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
