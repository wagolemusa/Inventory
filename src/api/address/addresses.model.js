const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./addresses.shema.json')

// Define model for employees
class Address extends Model {
    static get tableName(){
        return tableNames.address;
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Address;


