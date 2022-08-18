require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_DB
    },
  }

};
