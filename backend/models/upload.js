const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let uploadSchema = new Schema(
    {
        username: {
            type: String
        },
        data: {
            type: []
        }
    }
);

let Upload = mongoose.model("data", uploadSchema);

module.exports = Upload;