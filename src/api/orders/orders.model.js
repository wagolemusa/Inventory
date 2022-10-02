const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./orders.schema.json')

// Define model for employees
class Order extends Model {
    static get tableName(){
        return tableNames.orders
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Order;


