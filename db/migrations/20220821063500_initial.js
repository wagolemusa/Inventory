const knex = require('knex')
const tableNames = require('../../src/constants/tableNames.js')

// importing helpers
const {
  addDefaultColumns,
  createNameTable,
  references,
  email,
} = require('../../src/lib/tableUlities')


/**
 * @param {import('knex')} knex
 */

exports.up = async (knex) => {
  // table for users
  await Promise.all([

    knex.schema.createTable(tableNames.role, (table) => {
      table.increments().notNullable();
      table.string('role').notNullable().unique();
      addDefaultColumns(table)
    }),

    // gass size eg six kgs
    knex.schema.createTable(tableNames.size, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      addDefaultColumns(table)
    }),

    // cretate category eg refial or outlet
    knex.schema.createTable(tableNames.category, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      addDefaultColumns(table)
    }),

    // table for distrits
    createNameTable(knex, tableNames.distrit),
    // table for customer 

  ]);

  // table for address
  await knex.schema.createTable(tableNames.address, (table) => {
    table.increments().notNullable();
    table.string('town', 50).notNullable();
    table.string('zipcode', 15).notNullable();
    table.double('latitude').notNullable();
    table.double('longitude').notNullable();
    references(table, 'distrit')
    addDefaultColumns(table);
    table.unique([
      'town',
      'zipcode',
      'latitude',
      'longitude',
    ])

  }),
 
    await knex.schema.createTable(tableNames.employee, (table) => {
      table.increments().notNullable();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      email(table, 'email', 254).notNullable().unique();
      table.bigInteger('phone').notNullable();
      table.bigInteger('idnumber').notNullable();
      table.string('sex').notNullable();
      table.string('image_url')
      table.string('password').notNullable();
      references(table, 'role')
      references(table, 'address');
      addDefaultColumns(table);
    }),
   
    await knex.schema.createTable(tableNames.items, (table) => {
      table.increments().notNullable();
      table.integer('quantiy').notNullable();
      table.integer('retail_price').notNullable()
      table.integer('wholesale_price').notNullable()
      table.string('qrcode');
      table.string('points')
      references(table, 'category');
      references(table, 'size');
      references(table, 'employee')
      addDefaultColumns(table);

    }),


    // table for orders
    await knex.schema.createTable(tableNames.orders, (table) => {
      table.increments().notNullable();
      table.integer('quantity').notNullable()
      table.integer('total')
      table.string('status').defaultTo('pending')
      references(table, 'items');
      references(table, 'employee');
      addDefaultColumns(table);
    }),

  // table for payments
  await knex.schema.createTable(tableNames.payments, (table) => {
    table.increments().notNullable();
    table.integer('amount_total').notNullable();
    table.integer('phone').notNullable()
    table.string('payment_status').notNullable()
    table.string('payment_type').notNullable()
    table.string('payment_reference').notNullable()
    table.string('status').defaultTo('pending')
    references(table, 'employee');
    references(table, 'orders');
    addDefaultColumns(table);
  })

    // table for cart
    await knex.schema.createTable(tableNames.cart, (table) => {
      table.increments().notNullable();
      table.integer('quantity').notNullable()
      table.integer('price');
      table.integer('totalcart')
      references(table, 'items');
      references(table, 'employee');
      addDefaultColumns(table);
    }),

    // creating customers table
    await knex.schema.createTable(tableNames.customers, (table) => {
      table.increments().notNullable();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('business_name', 1000);
      email(table, 'email');
      table.integer('phone').notNullable();
      references(table, 'address');
      addDefaultColumns(table);
    }),

    // creating shops
    await knex.schema.createTable(tableNames.shops, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable();
      references(table, 'address');
      references(table, 'employee');
      addDefaultColumns(table);
    })

  // table for poits
  await knex.schema.createTable(tableNames.points, (table) => {
    table.increments().notNullable();
    table.integer('phone').notNullable();
    table.integer('points').notNullable();
    references(table, 'shops');
    addDefaultColumns(table);
  })

  // tracker tables
  await knex.schema.createTable(tableNames.trackers, (table) => {
    table.increments().notNullable();
    table.string('tracker_name').notNullable();
    table.string('number_plate').notNullable();
    references(table, 'employee');
    addDefaultColumns(table);
  })

  // take gas to tracker
  await knex.schema.createTable(tableNames.shipping, (table) => {
    table.increments().notNullable();
    table.integer('quantity').notNullable();
    references(table, 'category');
    references(table, 'size');
    references(table, 'trackers');
    addDefaultColumns(table);
  })

  // Add stocks to shops
  await knex.schema.createTable(tableNames.stock, (table) => {
    table.increments().notNullable()
    table.integer('quantity').notNullable()
    references(table, 'items');
    references(table, 'shops');
    references(table, 'employee');
    addDefaultColumns(table);
  })

};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.stock,
    tableNames.points,
    tableNames.payments,
    tableNames.trackers,
    tableNames.cart,
    tableNames.shops,
    tableNames.customers,
    tableNames.orders,
    tableNames.items,
    tableNames.shipping,
    tableNames.employee,
    tableNames.address,
    tableNames.distrit,
    tableNames.role,
    tableNames.size,
    tableNames.category,
  ].map((tableNames) => knex.schema.dropTable(tableNames)));

};
