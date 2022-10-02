const express = require('express');
const Customer = require('./customers.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const customer = await  Customer
        .query()
        .where('deleted_at', null)
    res.json(customer)
    }catch(error){
        console.log(error)
        return res.status(401).json({
            succces: false,
            message: "No data customer the system"
        })
    }


});

router.post('/', async (req, res, next) => {
    try {
        // TODO: set user id by logged in user
        const customer = await Customer.query().insert(req.body);
        res.json(customer);
      } catch (error) {
        next(error);
      }
    });

module.exports = router;
