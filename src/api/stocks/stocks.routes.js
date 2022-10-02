const express = require('express');
const Stock = require('./stocks.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const stock = await Stock
        .query()
        .where('deleted_at', null)
    res.json(stock)
    }catch(error){
        console.log(error)
        return res.status(401).json({
            succces: false,
            message: "No data in the system"
        })
    }


});

router.post('/', async (req, res, next) => {
    try {
      // TODO: set user id by logged in user
      const stock = await Stock.query().insert(req.body);
      res.json(stock);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
