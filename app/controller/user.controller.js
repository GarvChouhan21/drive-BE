const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../model/user.model");
const BlacklistToken = require("../model/blacklistToken.model");

module.exports.register = async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        const { fullname, email, password } = req.body;
        const firstname = fullname?.firstname || req.body.firstname;
        const lastname = fullname?.lastname || req.body.lastname;

        const hashPassword = await userModel.hashPassword(password);
        let user = await userService.createUser({
            firstname,
            lastname,
            email,
            password: hashPassword
        });

        const token = await user.generateToken();

        return res.status(201).json({ message: "user created successfully", token, user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        let isPasswordValid = await user.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "invalid password" });
        }
        let token = await user.generateToken();
        return res.status(200).json({ message: "user logged in successfully", token, user });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.getUserProfile = async (req, res) => {
    try {
        let user = await userModel.findById(req.user.id);
        return res.status(200).json({ message: "user profile fetched successfully", user });
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
        return res.status(200).json({ message: "user logged out successfully", blacklistToken });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}