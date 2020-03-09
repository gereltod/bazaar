exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          product_id: 1,
          product_name: "Test",
          product_desc: " test product ",
          product_image: "image1.jpeg",
          product_quantity: 1,
          product_price: 200,
          product_category: 1
        },
        {
          product_id: 2,
          product_name: "Hard ",
          product_desc: " test product ",
          product_image: "image2.jpeg",
          product_quantity: 1,
          product_price: 200,
          product_category: 1
        },
        {
          product_id: 3,
          product_name: "SSD hard",
          product_desc: " test product ",
          product_image: "image3.jpeg",
          product_quantity: 1,
          product_price: 200,
          product_category: 1
        }
      ]);
    });
};
