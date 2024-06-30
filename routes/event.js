const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');
const { validateJWT } = require('../middleware/validateToken');
const { check } = require('express-validator');
const { validator } = require('../middleware/validator');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use(validateJWT)

router.get('/', getEvents);

router.post('/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        validator
    ]
        ,createEvent);
router.put('/:id', [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validator
], updateEvent);
router.delete('/:id', deleteEvent);


module.exports = router;