const { token } = require("../redis");
const pick = require("lodash/pick");
const Reg = require("../helpers/validationReg");
const keys = require("../config/keys");
const knex = require("../db/knex");

const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

exports.basketList = async (req, res, next) => {
  try {
    var baskets = await knex("baskets").where(
      "user_id", '=',
      req.user.userid
    );
    console.log(baskets);
    res.json(baskets);
  } catch (err) {
    console.log("basketList exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};

exports.addBasket = async (req, res, next) => {
  try {
    var body = pick(req.body, [
      "product_id",
      "product_name",
      "product_desc",
      "product_image",
      "product_quantity",
      "product_price",
      "product_category",
      "quantity",
      "price"
    ]);
    var products = await knex("products")
      .where("product_id", "=", body.product_id)
      .first();

    if (products) {
      await knex("products")
        .where("product_id", body.product_id)
        .update({
          product_quantity: products.product_quantity - body.quantity
        });
      
      var new_basket={};
      new_basket.created_at = new Date();
      new_basket.updated_at = new Date();
      new_basket.product_id = body.product_id;
      new_basket.user_id = req.user.userid;
      new_basket.quantity = body.quantity;
      new_basket.price = body.price;
      new_basket.order_id = 1;
      new_basket.is_paid = false;
      new_basket.product_json = JSON.stringify(products);

      var basket_id = await knex("baskets").insert(new_basket, "basket_id");
      res.send({ basket_id: basket_id });
    } else {
      //res.json(products);
      res.send({ basket_id: 0 });
    }
  } catch (err) {
    console.log("addBasket exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};
