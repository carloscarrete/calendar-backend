const express = require('express');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');


const createUser = async (req, res = express.response) => {

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'User already exists'
            })
        }

        user = new User(req.body);
        user.save();

        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            message: 'User created',
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Please contact the administrator'
        })
    }

}

const loginUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'User doesnt exist'
            })
        }

        const comparePass = await user.comparePassword(password);

        if (!comparePass) {
            return res.status(400).json({
                ok: false,
                message: 'Incorrect password'
            })
        }

        const token = await generateJWT(user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Please contact the administrator'
        })
    }

}

const renewToken = async (req, res) => {

    const token = await generateJWT(req.uid, req.name);

    return res.status(200).json({
        ok: true,
        uid: req.uid,
        name: req.name,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}


