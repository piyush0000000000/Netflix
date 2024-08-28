const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require("express-validator")
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
});



router.post('/UpdatePassword',
    body('newpassword', 'password too short').isLength({ min: 5})
    , async (req, res) => {

        try {
            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array().toString(),update:false })
            }
            else {
                const error = validationResult(req)
                const user = await User.findOne({ email: req.body.email });
                if (user) {
                    if (req.body.password != user.password) {
                        res.status(400).json({ success: "wrong-current-password" , update:false})
                    }
                    else {
                        console.log(req.body.newpassword)
                        await User.updateOne({ email: req.body.email }, { $set: { password: req.body.newpassword } })
                        console.log("user updated successfully")
                        res.status(200).json({ success: "updated",update:true })

                    }
                }
                else {
                    res.status(400).json({error:"user not found",update:false})
                }
            }
        } catch (e) {
            console.log(e)
        }
    })

module.exports = router;