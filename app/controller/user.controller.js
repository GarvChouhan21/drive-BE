const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../model/user.model");

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