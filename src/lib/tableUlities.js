

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
    // const definition = table
    table
      .integer(`${tableNames}_id`)
      .unsigned()
      .references('id')
      .inTable(tableNames)
      .onDelete('cascade')
  }
  
  // helper function for images
  function url(table, columnName) {
    table.string(columnName, 2000)
  }
  
  // helper function for emails
  function email(table, columnName) {
    return table.string(columnName, 254);
  }

module.exports = {
    addDefaultColumns,
    createNameTable,
    references,
    email,
    url
}