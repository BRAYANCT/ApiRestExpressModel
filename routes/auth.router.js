const { Router } = require('express'), { check } = require('express-validator'), { login } = require('../controllers/auth.controllers'), { validarCampos } = require('../middlewares/validate-camps'),
    router = Router();

//metodo get
router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login);


module.exports = router;