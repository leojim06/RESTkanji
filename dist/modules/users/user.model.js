"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator = require("validator");
var bcrypt_nodejs_1 = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var uniqueValidator = require("mongoose-unique-validator");
var user_validation_1 = require("./user.validation");
var constants_1 = require("../../config/constants");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    firstName: {
        type: String,
        required: [true, 'FirstName is required!'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required!'],
        trim: true,
    },
    userName: {
        type: String,
        required: [true, 'UserName is required!'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!'],
        validate: {
            validator: function (password) {
                return user_validation_1.passwordReg.test(password);
            },
            message: '{VALUE} is not a valid password!',
        }
    },
    role: {
        type: String,
        enum: ['Admin', 'user'],
        default: 'user',
    }
}, { timestamps: true });
UserSchema.plugin(uniqueValidator, {
    message: '{VALUE} ya fue tomado',
});
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});
UserSchema.methods = {
    _hashPassword: function (password) {
        return bcrypt_nodejs_1.hashSync(password);
    },
    authenticateUser: function (password) {
        return bcrypt_nodejs_1.compareSync(password, this.password);
    },
    createToken: function () {
        var payload = { _id: this._id, };
        return jwt.sign(payload, constants_1.default.JWT_SECRET);
    },
    toAuthJSON: function () {
        return {
            _id: this._id,
            userName: this.userName,
            token: "JWT " + this.createToken(),
        };
    },
    toJSON: function () {
        return {
            _id: this._id,
            userName: this.userName,
        };
    },
};
exports.default = mongoose_1.model('User', UserSchema);
