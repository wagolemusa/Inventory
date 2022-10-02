const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./customers.shema.json')

// Define model for employees
class Customer extends Model {
    static get tableName(){
        return tableNames.customers;
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Customer;


