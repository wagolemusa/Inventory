const express = require('express');
const Cart = require('./cart.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const cart = await Cart
        .query()
        .where('deleted_at', null)
    res.json(cart)
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
      const cart = await Cart.query().insert(req.body);
      res.json(cart);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
