const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./points.shema.json')

// Define model for employees
class Point extends Model {
    static get tableName(){
        return tableNames.points
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Point;


