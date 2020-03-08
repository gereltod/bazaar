const { token } = require("../redis");
const pick = require("lodash/pick");
const Reg = require("../helpers/validationReg");
const keys = require("../config/keys");
const knex = require("../db/knex");

const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

const { attachPaginate } = require("knex-paginate");
attachPaginate();

exports.productList = async (req, res, next) => {
  try {
    var products = await knex("products")
      .orderBy("created_at", "desc")
      .paginate({
        perPage: req.query.size,
        currentPage: req.query.current,
        isLengthAware: true
      });
    res.json(products);
  } catch (err) {
    console.log("productList exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};


exports.productGet = async (req, res, next) => {
    try {
      var products = await knex("products")
      .whereExists('product_id', req.param.productid)
        .orderBy("created_at", "desc")
        .paginate({
          perPage: req.query.size,
          currentPage: req.query.current,
          isLengthAware: true
        });
      res.json(products);
    } catch (err) {
      console.log("productList exception", err);
      return res.status(500).send({ status: -1, error: "err" });
    }
  };