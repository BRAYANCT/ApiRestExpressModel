const { response, request } = require('express'),
    User = require('../models/user'),
    bcryptjs = require('bcryptjs'),
    validarCampos = require('../middlewares/validate-camps'), { esEmail } = require('../helpers/role');

const usersGet = async(req, res = response) => {
        const { limit = 5, desde = 0 } = req.query;
        const query = { condition: true };
        /*         const users = await User.find(query)
                    .skip(Number(desde))
                    .limit(Number(limit));
                const total = await User.countDocuments(query); */

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
        ])
        res.json({
            msg: 'Get Api - controlador',
            total,
            users
        });
    },
    usersPost = async(req, res = response) => {
        const { name, email, password, role } = req.body,
            user = new User({ name, email, password, role });
        //encript password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        //save users
        await user.save();
        res.json({
            msg: 'Post Api - controlador',
            user
        });
    },
    usersPut = async(req, res = response) => {
        const { id } = req.params, { _id, password, google, email, ...rest } = req.body;
        //validar contra db
        if (password) {
            //encript password
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        }
        const user = await User.findByIdAndUpdate(id, rest);
        res.json({
            msg: 'Put Api - controlador',
            user
        });
    },
    usersPatch = (req, res = response) => {
        res.json({
            msg: 'Path Api - controlador'
        });
    },
    usersDelete = async(req, res = response) => {
        const { id } = req.params;
        //borrar fisicamente
        //const user = await User.findByIdAndDelete(id);
        const user = await User.findByIdAndUpdate(id, { condition: false });
        res.json({
            msg: 'Delete Api - controlador',
            user
        });
    }


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}