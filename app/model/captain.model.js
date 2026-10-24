const mongoose = require('mongoose')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "name must be at least 3 characters long"],
            maxlength: [30, "name must be at most 30 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "name must be at least 3 characters long"],
            maxlength: [30, "name must be at most 30 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: { type: String, required: true },
        plate: { type: String, required: true },
        capacity: { type: Number, required: true },
        vehicleType: { type: String, required: true, enum: ['car', 'motercycle', 'auto'] }
    },
    location: {
        latitude: { type: Number },
        longitude: { type: Number }
    }
})

captainSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

let captainModel = mongoose.model('Captain', captainSchema)

module.exports = captainModel