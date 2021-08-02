const { Router } = require('express'), {
        check
    } = require('express-validator'), {
        login,
        googleSingin
    } = require('../controllers/auth.controllers'), {
        validarCampos
    } = require('../middlewares/validate-camps'),
    router = Router();

//metodo get

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login);
router.post('/google', [
    check('id_token', 'El token es necesario').not().isEmpty(),
    validarCampos
], googleSingin);

module.exports = router;