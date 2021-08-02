const { response } = require('express'),
    validateRole = (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se tiene que ejecutar el token primero'
            });
        }
        const { role, name } = req.user;

        if (role !== "AdminRol") {
            return res.status(401).json({
                msg: `El rol ${name} no es un administrador su rol es ${role}`
            });

        }
        next();
    },
    tieneRole = (...role) => {
        return (req, res = response, next) => {
            if (!req.user) {
                return res.status(500).json({
                    msg: 'Se tiene que ejecutar el token primero'
                });
            }
            if (!role.includes(req.user.role)) {
                return res.status(401).json({
                    msg: `El servicio requiere un rol:${role}`
                });
            }

            next();
        }
    }
module.exports = {
    validateRole,
    tieneRole
}