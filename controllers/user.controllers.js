const { response } = require('express'),
    usersGet = (req, res = response) => {
        const { q, nombre, apikey } = req.query;
        res.json({
            msg: 'Get Api - controlador',
            q,
            nombre,
            apikey
        });
    },
    usersPost = (req, res = response) => {
        const { nombre, edad } = req.body;

        res.json({
            msg: 'Post Api - controlador',
            nombre,
            edad
        });
    },
    usersPut = (req, res = response) => {
        const id = req.params.id;
        res.json({
            msg: 'Put Api - controlador',
            id
        });
    },
    usersPatch = (req, res = response) => {
        res.json({
            msg: 'Path Api - controlador'
        });
    },
    usersDelete = (req, res = response) => {
        res.json({
            msg: 'Delete Api - controlador'
        });
    }


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}