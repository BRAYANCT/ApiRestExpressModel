const validarCampos = require('../middlewares/validate-camps');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');

module.exports = {
    ...validarCampos,
    ...validateJWT,
    ...validateRole
}