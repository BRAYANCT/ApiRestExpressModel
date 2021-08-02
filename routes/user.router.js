const { Router } = require('express'), {
        usersGet,
        usersPost,
        usersPut,
        usersPatch,
        usersDelete
    } = require('../controllers/user.controllers'),
    router = Router(), { check } = require('express-validator'), {
        esRole,
        esEmail,
        exitsUserId
    } = require('../helpers/role'), {
        validarCampos,
        validateJWT,
        validateRole,
        tieneRole
    } = require('../middlewares/index');



//metodo get
router.get('/', usersGet);
//metodo put
router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(exitsUserId),
    check('role').custom(esRole),
    validarCampos
], usersPut);
//metodo post
router.post('/', [
    check('name', 'el nombre  es valido').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
    check('email', 'el correo no es valido').isEmail().custom(esEmail),
    // check('role', 'No es un rol valido').isIn(['AdminRol', 'UserRole', 'NormalRol']),
    check('role').custom(esRole),
    validarCampos
], usersPost);
//metodo delete
router.delete('/:id', [
    validateJWT,
    // validateRole,
    tieneRole('UserRole', 'AdminRol'),
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(exitsUserId),
    validarCampos
], usersDelete);
//metodo path
router.patch('/', usersPatch);

module.exports = router;