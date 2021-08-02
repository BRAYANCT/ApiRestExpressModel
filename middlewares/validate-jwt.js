const { response, request } = require('express');
const jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    validateJWT = async(req = request, res = response, next) => {
        const token = req.header('x-token')
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la peticion'
            });
        }
        try {
            const { uid } = jwt.verify(token, process.env.SECRETKEY);
            //leer el usuario que corresponde al iud
            const user = await User.findById(uid);
            //verificar si el uid tiene estado true
            if (!user) {
                return res.status(401).json({
                    msg: 'el usuario no existe en la base ded datos'
                })
            }
            if (!user.condition) {
                return res.status(401).json({
                    msg: 'el usuario ya a asido eliminado'
                })
            }
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                msg: 'token no valido'
            })
        }

    }
module.exports = {
    validateJWT
}