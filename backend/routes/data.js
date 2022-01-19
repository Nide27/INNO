const express = require("express");
const csv = require('csvtojson');
const fs = require('fs');
const Upload = require("../models/upload");
const router = express.Router();
const auth = require("../middleware/auth");

router.post('/upload', auth, async (req, res) => {
    try {

        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = req.files.data;

            const csvFilePath= './temp/' + data.name;

            await data.mv(csvFilePath);

            csv().fromFile(csvFilePath).then((jsonObj) => {
                console.log(jsonObj);
            })

            const jsonArray = await csv().fromFile(csvFilePath);

            let upload = new Upload({
                uid: req.userData.id,
                data: jsonArray
            });

            upload.save();

            res.send({
                status: true,
                message: 'File was uploaded',
                data: {
                    name: data.name,
                    mimetype: data.mimetype,
                    size: data.size
                }
            });

            fs.unlink(csvFilePath, (err) => {
                if(err){
                    console.error(err);
                }
            })

        }
    } catch (err){
        res.status(500).send(err);
    }
})

router.get('/data', auth, async (req, res) => {
    try {

        const uploadArray = await Upload.find({
            uid: req.userData.id
        })

        res.send({
            status: true,
            message: 'Successfully retrieved data',
            data: uploadArray
        });

    } catch (err){
        res.status(500).send(err);
    }
})

module.exports = router;