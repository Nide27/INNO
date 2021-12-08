const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { email, username, password, passwordRepeat } = req.body;

        if(!email || !username || !password || !passwordRepeat){
            return res.status(400).json({ msg: "Bad request." });
        }

        if(password.length < 8){
            return res.status(200).json({ msg: "The password must be at least 8 characters long." });
        }

        if(password !== passwordRepeat){
            return res.status(200).json({ msg: "Passwords don't match, please try again." });
        }

        if(await User.findOne({ email: email })){
            return res.status(400).json({ msg: "There is already an account tied to this email." });
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash){

                let user = new User({
                    email: email,
                    username: username,
                    password: hash,
                });

                user.save();

            })
        })

        return res.status(200).json({ msg: "User was created." });

    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ msg: "Bad request." });
        }

        const user = await User.findOne({ email: email });

        if(!user){
            return res.status(200).json({ success: false, msg: "Cannot find account with this email address." });
        }

        if(! await bcrypt.compare(password, user.password)){
            return res.status(200).json({ success: false, msg: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            token: token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
})

module.exports = router;