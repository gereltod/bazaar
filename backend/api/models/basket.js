const { token } = require("../redis");
const pick = require("lodash/pick");
const Reg = require("../helpers/validationReg");
const keys = require("../config/keys");
const knex = require("../db/knex");

const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

const { attachPaginate } = require("knex-paginate");
attachPaginate();

exports.basketList = async (req, res, next) => {
  try {
    var baskets = await knex("baskets").whereExists(
      "user_id",
      req.user.user_id
    );
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
      "quantity","price",
    ]);
    var products = await knex("products").whereExists(
      "product_id",
      req.param.productid
    );

    console.log(products);

    res.json(products);
  } catch (err) {
    console.log("addBasket exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};
