const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const User = require("../models/user");

exports.setup = async (req, res, next) => {
    if (!req.body || !req.body._id) {
        res.status(400).json({
            error: "Invalid data provided",
        });
    }
    const id = req.body._id;
    var user;
    console.log("tuf setup");
    const secret = speakeasy.generateSecret({
        length: 10,
        id: id,
        issuer: "Mohit TFA v0.0",
    });

    var url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: "Test",
        issuer: "Mohit TFA v0.0",
        encoding: "base32",
    });
    try {
        user = await User.findByIdAndUpdate(id, {
            tfaSecret: secret.base32,
        });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
    QRCode.toDataURL(url, (err, imgURL) => {
        return res.status(200).json({
            id: id,
            username: user.username,
            imgURL,
        });
    });
};

exports.verify = async (req, res, next) => {
    if (!req.body || !req.body.token || !req.body._id) {
        res.status(400).json({
            error: "Invalid data provided",
        });
    }
    const token = req.body.token;
    const id = req.body._id;
    const user = await User.findById(id);
    console.log(id);
    let isVerified = speakeasy.totp.verify({
        secret: user.tfaSecret,
        encoding: "base32",
        token: token,
    });
    if (!isVerified) {
        res.status(400).json({
            error: "Token Validation failed",
        });
    } else {
        res.status(200).json({
            message: "Token verified successfully",
        });
    }
};
