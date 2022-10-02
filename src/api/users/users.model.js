const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./users.schema.json')

// Define model for employees
class User extends Model {
    static get tableName(){
        return tableNames.employee;
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = User;


