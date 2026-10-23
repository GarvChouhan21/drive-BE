let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 20
        },
        lastname: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
    },
    socketId: {
        type: String
    }
});


userSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

let User = mongoose.model("User", userSchema);
module.exports = User;
