const express = require('express');
const Tracker = require('./trackers.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const tracker = await Tracker
        .query()
        .where('deleted_at', null)
    res.json(tracker)
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
      const tracker = await Tracker.query().insert(req.body);
      res.json(tracker);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
