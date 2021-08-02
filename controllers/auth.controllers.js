const { response, request } = require('express'),
    User = require('../models/user'),
    bcryptjs = require('bcryptjs'), { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        //verificar si el email existe
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                msg: 'El correo no es correctos',
            })
        }
        //si el usuario esta activo
        if (!user.condition) {
            return res.status(400).json({
                msg: 'El correo esta desabilitado',
            })
        }
        //verificar la contraseña
        const passwordValid = bcryptjs.compareSync(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'El password es incorrecto',
            })
        }
        //generar el jwt
        const token = await generateJWT(user.id);
        res.json({
            msg: 'login ok',
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al iniciar sesion',
        })
    }

}

module.exports = {
    login
}