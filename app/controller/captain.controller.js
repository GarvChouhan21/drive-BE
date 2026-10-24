let captainService = require('../services/captain.service');
let { validationResult } = require('express-validator');
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