const express = require('express')
const states = require('./states/state.routes')
const project = require('../constants/projects')
const users = require('./users/users.routes')
const auth = require('./auth/auth.routes')
const addresses = require('./address/addresses.routes')

const router =  express.Router();

router.get('/', (req, res) => {
    res.json({
        message: project.message,
    })
})

router.use('/states', states); 
router.use('/users', users);
router.use('/addresses', addresses)
router.use('/auth', auth);

module.exports = router;