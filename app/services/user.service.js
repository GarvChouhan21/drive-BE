let userModel = require("../model/user.model");

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error("firstname, email and password are required");
    }

    let user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    return user;
};

