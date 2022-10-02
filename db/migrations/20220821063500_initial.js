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

    // table for role
    createNameTable(knex, tableNames.role),

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
      table.string('password').notNullable();
      references(table, 'role')
      references(table, 'address');
      addDefaultColumns(table);
    }),

    await knex.schema.createTable(tableNames.items, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable();
      table.integer('item_size').notNullable();
      table.integer('quantiy').notNullable();
      table.string('qrcode');
      table.integer('retail_price').notNullable();
      table.integer('whole_price').notNullable();
      references(table, 'employee')
      addDefaultColumns(table);

    }),


    // table for orders
    await knex.schema.createTable(tableNames.orders, (table) => {
      table.increments().notNullable();
      table.integer('quantity').notNullable().unique();
      table.integer('total')
      table.string('status')
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
    table.string('status');
    references(table, 'employee');
    references(table, 'orders');
    addDefaultColumns(table);
  })

    // table for cart
    await knex.schema.createTable(tableNames.cart, (table) => {
      table.increments().notNullable();
      table.integer('quantity').notNullable().unique();
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
    table.integer('quantity').notNullable();
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

  await knex.schema.createTable(tableNames.supervisor, (table) => {
    table.increments().notNullable();
    references(table, 'employee');
    addDefaultColumns(table);
  })


  await knex.schema.createTable(tableNames.takegas, (table) => {
    table.increments().notNullable();
    table.integer('quantity').notNullable();
    table.integer('six_kgs').notNullable();
    table.integer('seven_kgs').notNullable();
    table.integer('fifteen_kgs').notNullable();
    references(table, 'supervisor');
    addDefaultColumns(table);
  })

  await knex.schema.createTable(tableNames.stock, (table) => {
    table.increments().notNullable()
    table.integer('quantity').notNullable()
    table.integer('six_kgs')
    table.integer('seven_kgs')
    table.integer('fifteen_kgs')
    references(table, 'shops');
    addDefaultColumns(table);
  })

};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.role,
    tableNames.shops,
    tableNames.stock,
    tableNames.points,
    tableNames.payments,
    tableNames.trackers,
    tableNames.cart,
    tableNames.customers,
    tableNames.orders,
    tableNames.items,
    tableNames.takegas,
    tableNames.employee,
    tableNames.supervisor,
    tableNames.address,
    tableNames.distrit
  ].map((tableNames) => knex.schema.dropTable(tableNames)));

};
