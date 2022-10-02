const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./items.schema.json')

// Define model for employees
class Item extends Model {
    static get tableName(){
        return tableNames.items
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Item;


