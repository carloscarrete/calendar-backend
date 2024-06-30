const { Router } = require('express');
const { check } = require('express-validator')
const { createUser, loginUser, renewToken } = require('../controllers/auth.controller');
const { validator } = require('../middleware/validator');
const { validateJWT } = require('../middleware/validateToken');
const router = Router();


router.get('/', (req, res) => {
    return res.status(200).json({
        ok: true,
        message: 'Hello World!'
    })
})


router.post('/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validator
    ]
    ,
    createUser)

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validator
    ] ,loginUser)
    
router.get('/renew', validateJWT ,renewToken)


module.exports = router
