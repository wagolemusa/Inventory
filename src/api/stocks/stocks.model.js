const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./stocks.shema.json')

// Define model for employees
class Stock extends Model {
    static get tableName(){
        return tableNames.stock
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Stock;


