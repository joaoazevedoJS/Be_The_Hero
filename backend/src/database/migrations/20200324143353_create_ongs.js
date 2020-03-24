exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string("id").primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
};

// Para deletar caso aconteça um erro
exports.down = function(knex) {
  return knew.schema.dropTable('ongs')
};
