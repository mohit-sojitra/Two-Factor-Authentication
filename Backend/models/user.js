const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        tfaSecret:{
            type:String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
