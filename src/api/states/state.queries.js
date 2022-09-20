const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name']

module.exports = {
    find(){
    
        return db(tableNames.distrit).select(fields)
    },

    // Get by Id
   async get(id){
        const [state] = await db(tableNames.distrit)
            .select(fields)
            .where({
                id,
        });
        return state;
    }
};


