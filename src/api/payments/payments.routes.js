const express = require('express');
const Payment = require('./payments.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const payment = await Payment
        .query()
        .where('deleted_at', null)
    res.json(payment)
    }catch(error){
        console.log(error)
        return res.status(401).json({
            succces: false,
            message: "No data Address the system"
        })
    }


});

router.post('/', async (req, res, next) => {
    try {
      // TODO: set user id by logged in user
      const payment = await Payment.query().insert(req.body);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
