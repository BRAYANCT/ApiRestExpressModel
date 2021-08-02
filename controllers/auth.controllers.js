const { response, request } = require('express'), { googleverify } = require('../helpers/google-verify'),
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

    },
    googleSingin = async(req, res = response) => {
        const { id_token } = req.body;

        try {
            const { email, name, picture } = await googleverify(id_token);
            let user = await User.findOne({ email });
            if (!user) {
                //create users
                const data = {
                    name,
                    email,
                    password: ':)',
                    picture,
                    google: true

                };
                user = new User(data);
                await user.save();
            }
            //yes user en db 
            if (!user.condition) {
                return res.status(401).json({
                    msg: 'Hable con el administrador,user bloqueado'
                });
            }
            //jwt
            const token = await generateJWT(user.id);
            res.json({
                msg: 'login ok',
                user,
                token

            })
        } catch (error) {
            return res.status(400).json({
                msg: 'token de google no es reconocido',
            })
        }

    }

module.exports = {
    login,
    googleSingin
}