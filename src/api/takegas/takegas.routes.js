const express = require('express');
const Takegas = require('./takegas.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const takegas = await Takegas
        .query()
        .where('deleted_at', null)
    res.json(takegas)
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
      const takegas = await Takegas.query().insert(req.body);
      res.json(takegas);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
