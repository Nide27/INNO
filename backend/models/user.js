const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            minlength: 8,
        }
    }
);

let User = mongoose.model("user", userSchema);

module.exports = User;