const express = require('express');

const queries = require('./state.queries'); 

const router = express.Router();


router.get('/',  async (req, res) => {
    const states = await queries.find();
    res.json(states)
})


// Get district by Id
router.get('/:id', async(req, res, next) => {
    const { id } = req.params
    try {
        const state = await queries.get(parseInt(id, 10) || 0)
        if(state){
            return res.json(state);
        }
        return next()
    }catch(error){
        return next(error)
    }
})

module.exports = router;