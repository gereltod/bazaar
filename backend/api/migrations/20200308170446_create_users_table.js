
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('user_id');
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.datetime('created_at');
        table.datetime('updated_at');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
