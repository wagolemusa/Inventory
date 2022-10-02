const express = require('express');
const Order= require('./orders.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const order = await Order
        .query()
        .where('deleted_at', null)
    res.json(order)
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
      const order = await Order.query().insert(req.body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
