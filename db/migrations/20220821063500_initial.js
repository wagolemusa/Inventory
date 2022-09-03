const knex = require('knex')
const tableNames = require('../../src/constants/tableNames.js')


function addDefaultColumns(table) {
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
function url(table, columnName) {
  table.string(columnName, 2000)
}

// helper function for emails
function email(table, columnName) {
  return table.string(columnName, 254);
}

/**
 * @param {import('knex')} knex
 */

exports.up = async (knex) => {
  // table for users
  await Promise.all([
    knex.schema.createTable(tableNames.items, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable();
      table.integer('item_size').notNullable();
      table.integer('item_price').notNullable();
      table.integer('whole_price').notNullable();
      addDefaultColumns(table);

    }),

    // table for role
    createNameTable(knex, tableNames.role),

    // table for distrits
    createNameTable(knex, tableNames.distrit),

      // table for customer 
    knex.schema.createTable(tableNames.customer, (table) => {
      table.increments().notNullable();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('business_name', 1000);
      email(table, 'email');
      table.integer('phone').notNullable();
      table.string('password').notNullable();
      addDefaultColumns(table);
    }),

  ]);

      // table for address
  await knex.schema.createTable(tableNames.address, (table) => {
        table.increments().notNullable();
        table.string('town', 50).notNullable();
        table.string('zipcode', 15).notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
        references(table, 'distrit')
        addDefaultColumns(table);
  
  }),

  await knex.schema.createTable(tableNames.employee, (table) => {
    table.increments().notNullable();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    email(table, 'email', 254).notNullable().unique();
    table.bigInteger('phone').notNullable();
    table.bigInteger('idnumber').notNullable();
    table.string('sex').notNullable();
    table.string('password').notNullable();
    references(table, 'address')
    addDefaultColumns(table);
  }),


    // table for orders
    await knex.schema.createTable(tableNames.order, (table) => {
      table.increments().notNullable();
      table.integer('quantity').notNullable().unique();
      table.string('status').notNullable()
      references(table, 'items')
      references(table, 'employee')
      addDefaultColumns(table);
    }),


    // creating shops
    await knex.schema.createTable(tableNames.shop, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable();
      table.float('latitude').notNullable();
      table.float('longitude').notNullable();
      references(table, 'address');
      references(table, 'employee');
      addDefaultColumns(table);
    })

  // table for poits
  await knex.schema.createTable(tableNames.points, (table) => {
    table.increments().notNullable();
    table.integer('phone').notNullable();
    table.integer('quantity').notNullable();
    table.integer('points').notNullable();
    references(table, 'employee');
    addDefaultColumns(table);
  })

  // table for payments
  await knex.schema.createTable(tableNames.payment, (table) => {
    table.increments().notNullable();
    table.integer('amount').notNullable();
    references(table, 'employee');
    references(table, 'order');
    table.string('status');
    addDefaultColumns(table);
  })



  // tracker tables
  await knex.schema.createTable(tableNames.tracker, (table) => {
    table.increments().notNullable();
    table.string('tracker_name').notNullable();
    table.string('number_plate').notNullable();
    references(table, 'employee');
    addDefaultColumns(table);
  })

};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.customer,
    tableNames.shop,
    tableNames.role,
    tableNames.points,
    tableNames.payment,
    tableNames.tracker,
    tableNames.order,
    tableNames.items,
    tableNames.employee,
    tableNames.address,
    tableNames.distrit
  ].map((tableNames) => knex.schema.dropTable(tableNames)));

};
