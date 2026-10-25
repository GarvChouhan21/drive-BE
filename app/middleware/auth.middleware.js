let userModel = require('../model/user.model');
let captainModel = require('../model/captain.model');
let BlacklistToken = require('../model/blacklistToken.model');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
require('dotenv').config();

module.exports.authUser = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "unauthorised" });
        }
        const isBlackListed = await BlacklistToken.findOne({ token: token });
        if (isBlackListed) {
            return res.status(401).json({ message: "unauthorised" });
        }
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decodedToken.id);
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "unauthorised" });
        }
        const isBlackListed = await BlacklistToken.findOne({ token: token });
        if (isBlackListed) {
            return res.status(401).json({ message: "unauthorised" });
        }
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.captain = await captainModel.findById(decodedToken.id);
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};