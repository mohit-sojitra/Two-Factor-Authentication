const User = require("../models/user");

exports.login = async (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password) {
        res.status(400).json({
            error: "Invalid data provide email and password",
        });
    }
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await User.findOne({
        email,
        password,
    });
    if (!existingUser) {
        res.status(400).json({
            error: "Invalid email or password",
        });
    }
    res.status(200).json({
        message: "Login successfully",
        ...existingUser._doc,
    });
};

exports.register = async (req, res, next) => {
    if (
        !req.body ||
        !req.body.email ||
        !req.body.password ||
        !req.body.username
    ) {
        res.status(400).json({
            error: "Invalid data provide username,email and password",
        });
    }
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const user = new User({
        email,
        username,
        password,
    });
    var createdUser;
    try {
        createdUser = await user.save();
    } catch (error) {
        res.status(400).json({ message: error });
    }
    console.log(createdUser);
    res.status(200).json({
        message: "user created success",
        ...createdUser._doc,
    });
};
