const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let user = new User(req.body);
        user = await user.save();
        res.status(200).json({
            status: 200,
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports = router;