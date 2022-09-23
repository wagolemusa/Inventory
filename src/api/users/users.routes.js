const express = require('express');
const User = require('./users.model')

const router = express.Router();

router.get('/', async(req, res) =>{
    const users = await  User
        .query()
        .select('id', 'firstname', 'lastname', 'email', 'phone', 'idnumber', 'sex', 'created_at', 'updated_at')
        .where('deleted_at', null)
    res.json(users)
});

module.exports = router;
