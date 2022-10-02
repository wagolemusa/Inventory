const express = require('express');
const Point = require('./points.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const point = await Point
        .query()
        .where('deleted_at', null)
    res.json(point)
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
      const point = await Point.query().insert(req.body);
      res.json(point);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
