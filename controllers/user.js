const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: hash,
        })

        try {
            await user.save()
            res.status(201).json({ message: "new user created" })
        } catch (error) {
            res.status(400).json({ error })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.login = async (req, res, next) => {
    try {
    } catch (error) {}
}
