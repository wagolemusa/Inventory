const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./shops.schema.json')

// Define model for employees
class Shop extends Model {
    static get tableName(){
        return tableNames.shops
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Shop;


