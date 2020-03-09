exports.up = function(knex) {
  return knex.schema.createTable("products", function(table) {
    table.increments('product_id');
    table.string("product_name").notNullable();
    table.string("product_desc");
    table.string("product_image");
    table.integer("product_quantity");
    table.integer("product_price");
    table.integer("product_category");
    table.datetime("created_at");
    table.datetime("updated_at");
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};

