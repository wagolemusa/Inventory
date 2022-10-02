const express = require('express')

const states = require('./states/state.routes')
const project = require('../constants/projects')
const users = require('./users/users.routes')
const auth = require('./auth/auth.routes')
const addresses = require('./address/addresses.routes')
const items = require('./items/items.routes')
const orders = require('./orders/orders.routes')
const customers = require('./customers/customers.routes')
const shops = require('./shops/shops.routes')
const points = require('./points/points.routes')
const payments = require('./payments/payments.routes')
const takegas = require('./takegas/takegas.routes')
const stock = require('./stocks/stocks.routes')
const tracker = require('./trackers/trackers.routes')
const cart = require('./cart/cart.routes')

const authMiddlewares = require('./auth/auth.middlewires')

const router =  express.Router();

router.get('/', (req, res) => {
    res.json({
        message: project.message,
    })
})

router.use('/states',  authMiddlewares.isLoggedIn, states,);
router.use('/users', authMiddlewares.isLoggedIn, users);
router.use('/addresses',  addresses)
router.use('/auth', auth);
router.use('/items', items);
router.use('/orders', orders)
router.use('/shops', shops)
router.use('/points', points)
router.use('/customers', customers)
router.use('/payments', payments)
router.use('/stock', stock)
router.use('/takegas', takegas)
router.use('./tracker', tracker)
router.use('./cart', cart)



module.exports = router;