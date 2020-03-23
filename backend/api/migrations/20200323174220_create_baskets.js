
exports.up = function(knex) {
    return knex.schema.createTable("baskets", function(table) {
        table.increments('basket_id');
        table.integer("product_id");
        table.integer("user_id");
        table.integer("quantity");
        table.integer("price");
        table.integer("order_id");
        table.boolean('is_paid');
        table.string("product_json");
        table.datetime("created_at");
        table.datetime("updated_at");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('baskets');
};
