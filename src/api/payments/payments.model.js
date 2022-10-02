const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./payments.schema.json')

// Define model for employees
class Payment extends Model {
    static get tableName(){
        return tableNames.payments
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Payment;


