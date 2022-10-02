const express = require('express');
const Shop = require('./shops.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const shops = await Shop
        .query()
        .where('deleted_at', null)
    res.json(shops)
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
      const shops = await Shop.query().insert(req.body);
      res.json(shops);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
