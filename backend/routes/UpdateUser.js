const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
});

router.post('/UpdateUser',
    body('email', 'Invalid email').isEmail(),
    body('password', 'password too short').isLength({ min: 5 })
    , async (req, res) => {

        try {
            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array().toString() })
            }
            else {
                const user = await User.findOne({ email: req.body.email });
                if (user) {
                    await User.updateOne({ email: req.body.email }, { $set: { password: req.body.password } });
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(400).json({ success: false })
                }
            }
        } catch (error) {
            res.status(400).json("some error catched")
        }
    })

module.exports = router