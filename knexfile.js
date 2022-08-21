
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
  }

};


// const knex = require('knex')

// module.exports = knex({
//   development: {
//     client: 'postgresql',
//     client: 'pg',
//     connection: {
//       host: 'db',
//       user: process.env.POSTGRES_USER,
//       password: process.env.POSTGRES_PASSWORD,
//       database: process.env.POSTGRES_DB,
//     },
//     migrations: {
//         directory: './db/migrations',
//       },
//   }
// })

