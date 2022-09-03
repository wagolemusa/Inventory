const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Knex = require('knex');
const orderTable = require('../../src/constants/orderTable');
const tableNames = require('../../src/constants/tableNames');
const distrit = require('../../src/constants/district')

/**
 * @param {import('knex')} knex
 */


exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await orderTable
    .reduce(async (promise, table_name) =>{
      await promise;
      console.log('Clearing', table_name)
      return knex(table_name).del();
    }, Promise.resolve()
  );


  const password  = crypto.randomBytes(15).toString('hex');

  const employee = {
    email: 'homiemusa@gmail.com',
    firstname: 'refuge',
    lastname: 'wise',
    phone:  '0725696042',
    idnumber: '222000222',
    sex: 'man',
    password: await bcrypt.hash(password, 12)
  };

  // seed employees
  const [createdUser] = await knex(tableNames.employee).insert(employee).returning('*');
  console.log('User created:', {
    password,
  }, createdUser)

  //  seed distrits
  await knex(tableNames.distrit)
      .insert(distrit)

};
