const Role = require('../models/role'),
    User = require('../models/user'),
    esRole = async(role = '') => {
        const exitRol = await Role.findOne({ role });
        if (!exitRol) {
            throw new Error(`El rol ${role} no esta registrado en la db`);
        }
    },
    esEmail = async(email = '') => {
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            throw new Error(`El email ${email} ya esta registrado en la db`);
        }
    },
    exitsUserId = async(id) => {
        const exitsUser = await User.findById(id);
        if (!exitsUser) {
            throw new Error(`NO existe el id ${id} `);
        }
    }
module.exports = {
    esRole,
    esEmail,
    exitsUserId
}