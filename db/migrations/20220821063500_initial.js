const knex = require('knex')

const tableNames = require('../../src/constants/tableNames.js')

/**
 * @param {import('knex')} knex
 */

exports.up = async(knex) => {
  await knex.schema.createTable(tableNames.user, (table) =>{
    table.increments().notNullable();
    table.string('email', 254).notNullable().unique();
    table.string('name').notNullable();
    table.string('password', 127).notNullable();
    table.datetime('last_login');
  })
};


exports.down = async(knex) => {
  await knex.schema.dropTable(tableNames.user);
};
