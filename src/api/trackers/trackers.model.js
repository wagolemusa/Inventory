const { Model } = require('objection');

const tableNames = require('../../constants/tableNames')
const schema = require('./trackers.shema.json')

// Define model for employees
class Tracker extends Model {
    static get tableName(){
        return tableNames.trackers
    }

        // static get jsonSchema(){
        //     return schema;
        // }
}

module.exports = Tracker;


