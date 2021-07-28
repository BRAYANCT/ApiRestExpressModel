const { Router } = require('express'), { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/user.controllers'),
    router = Router();



//metodo get
router.get('/', usersGet);
//metodo put
router.put('/:id', usersPut);
//metodo post
router.post('/', usersPost);
//metodo delete
router.delete('/', usersDelete);
//metodo path
router.patch('/', usersPatch);


module.exports = router;