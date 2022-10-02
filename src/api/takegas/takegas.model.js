const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./takegas.shema.json')

// Define model for employees
class Takegas extends Model {
    static get tableName(){
        return tableNames.takegas
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Takegas;


