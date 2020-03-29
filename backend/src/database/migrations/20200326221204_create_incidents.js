exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments(); // Chave primária

    // Campos
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    // Chave estrangeira
    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs'); // Referência da FK
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
