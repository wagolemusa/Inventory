const knex = require('knex')

const tableNames = require('../../src/constants/tableNames.js')


function addDefaultColumns(table){
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

// helper function which create tables with similar column names 
function createNameTable(knex, table_name) {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    addDefaultColumns(table)
  })
}

// helper function for references
function references(table, tableNames) {
  table
    .integer(`${tableNames}_id`)
    .unsigned()
    .references('id')
    .inTable(tableNames)
    .onDelete('cascade');
}

// helper function for images
function url(table, columnName){
  table.string(columnName, 2000)
}

// helper function for emails
function email(table, columnName){
  return table.string(columnName, 254);
}



/**
 * @param {import('knex')} knex
 */

exports.up = async(knex) => {
  // table for users

  await Promise.all([
    knex.schema.createTable(tableNames.user, (table) =>{
      table.increments().notNullable();
      email(table, 'email', 254).notNullable().unique();
      table.string('name').notNullable();
      table.string('password', 127).notNullable();
      table.datetime('last_login');
      addDefaultColumns(table);
    }),
    // table for type items, country, state, shape
    createNameTable(knex, tableNames.item_type),
    createNameTable(knex, tableNames.country),
    createNameTable(knex, tableNames.state),
    createNameTable(knex, tableNames.shape),

    // table for lacation
    knex.schema.createTable(tableNames.location, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.string('description', 1000);
      url(table, 'image_url')
      addDefaultColumns(table);
    })
  ]);

  // table for address
  await knex.schema.createTable(tableNames.address, (table) => {
    table.increments().notNullable();
    table.string('street_address_1', 50).notNullable();
    table.string('city', 50).notNullable();
    table.string('zipcode', 15).notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    references(table, 'state');
    references(table, 'country');
  });


  // table for manufacturer 
  await knex.schema.createTable(tableNames.manufacturer, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    url(table, 'logo_url');
    table.string('description', 1000);
    url(table, 'website_url');
    email(table, 'email');
    references(table, 'address')
  })

};


exports.down = async(knex) => {
  await Promise.all([
    tableNames.manufacturer,
    tableNames.address,
    tableNames.user,
    tableNames.item_type,
    tableNames.country,
    tableNames.state,
    tableNames.shape,
    tableNames.location,
  ].map((tableNames) => knex.schema.dropTable(tableNames)));

};
