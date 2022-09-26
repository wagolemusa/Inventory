const express = require('express');
const Address = require('./addresses.model');


const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const address = await  Address
        .query()
        .where('deleted_at', null)
    res.json(address)
    }catch(error){
        console.log(error)
        return res.status(401).json({
            succces: false,
            message: "No data Address the system"
        })
    }


});

router.post('/', async (req, res, next) => {
    try{ 
        [
            'town',
            'zipcode',
            'latitude',
            'longitude',
        ].forEach((prop) => {
            if(req.body[prop]){
                req.body[prop] = req.body[prop].toString().toLowerCase().trim();
            }
        })

        const address = await Address
        .query()
        .insert(req.body);
        res.json(address)
    }catch(error){
        next(error);
        // console.log(error)
        // return res.status(401).json({
        //     succces: false,
        //     message: "Error inserting data Address in the system"
        // })
    }

});

module.exports = router;
