const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        email: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        }
    }
);

let User = mongoose.model("user", userSchema);

module.exports = User;