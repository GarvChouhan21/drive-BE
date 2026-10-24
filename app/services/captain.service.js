let captainModel = require("../model/captain.model")
module.exports.createCaptain = async ({ fullname, email, password, vehicle }) => {
    const { color, plate, capacity, vehicleType } = vehicle || {};
    if (!fullname || !email || !password) {
        throw new Error("firstname, email and password are required");
    }
    if (!color || !plate || !capacity || !vehicleType) {
        throw new Error("color, plate, capacity and vehicleType are required");
    }

    let user = await captainModel.create({
        fullname,
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return user;
};
