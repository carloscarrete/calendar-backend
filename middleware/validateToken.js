const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            message: 'No token provided'
        })
    }

    try{
        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT);
        req.uid = uid;
        req.name = name;
    }catch(error){
        console.log(error)
        return res.status(401).json({
            ok: false,
            message: 'Invalid token'
        })
    }

    next();
}


module.exports = {
    validateJWT
}