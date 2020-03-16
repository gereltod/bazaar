const { token } = require("../redis");
const pick = require("lodash/pick");
const Reg = require("../helpers/validationReg");
const keys = require("../config/keys");
const knex = require("../db/knex");

const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
var fs = require("fs"), path = require('path');

const { attachPaginate } = require("knex-paginate");
attachPaginate();

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, keys.filePath);
  },
  filename: function(req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  }
});

const upload = multer({ storage: storage }).any();

exports.productList = async (req, res, next) => {
  try {
    var products = await knex("products").paginate({
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
      .whereExists("product_id", req.param.productid)
      .paginate({
        perPage: req.query.size,
        currentPage: req.query.current,
        isLengthAware: true
      });
    res.json(products);
  } catch (err) {
    console.log("productGet exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};

exports.getImage = function(req, res, next) {
  var id = req.params.imagename;
  var path_file = keys.filePath + id;
  console.log(__dirname);

  if (!id) {
    return res.send({ error_code: 1001, message: "Missing info" });
  }
  console.log(path.join(__dirname, path_file));
  fs.readFile(path.join(__dirname, path_file), function(err, data) {
    if (err) {
      console.log(err);
      return res
        .status(422)
        .send({ error_code: 1001, message: "File not exists" });
    }
    res.header("Content-Type", "image/jpeg");
    res.header(
      "Content-Disposition",
      "inline;filename=" + id
    );
    res.end(data);
  });
};

exports.productAdd = async (req, res, next) => {
  upload(req, res, function(err) {
    if (err) {
      next(err);
    }
    console.log(req.files);
    let extArray = req.files[0].mimetype.split("/");
    let extension = extArray[extArray.length - 1];

    const img = new Images({
      path: req.files[0].path,
      originalname: req.files[0].originalname,
      extension: extension,
      users: user._id,
      lastModified: new Date()
    });
    img.save(async err => {
      if (err) {
        return callback(err, null);
      }
      await resize_page(req.files, req.query.type);

      return callback(null, img);
    });
  });
};

function resize_page(files, type) {
  return Promise.all(
    files.map(image => {
      if (_.isEqual(type, "avatar")) {
        return Promise.all(
          constants.image.profile.sizes.map(size => {
            return new Promise((resolve, reject) => {
              sharp(image.path)
                .resize(size.width, size.height)
                .jpeg({
                  quality: 100,
                  chromaSubsampling: "4:4:4",
                  force: false
                })
                .png({ quality: 100, force: false })
                .webp({ quality: 100, lossless: true, force: false })
                .toFile(
                  path.dirname(image.path) +
                    "/" +
                    path.basename(image.path, path.extname(image.path)) +
                    "-" +
                    size.name +
                    path.extname(image.path),
                  function(err, info) {
                    if (err) {
                      reject(err);
                    }
                    resolve(info);
                  }
                );
            });
          })
        );
      } else if (_.isEqual(type, "post")) {
        return Promise.all(
          constants.image.post.sizes.map(size => {
            return new Promise((resolve, reject) => {
              sharp(image.path)
                .resize(size.width, size.height)
                .jpeg({ quality: 95, force: false })
                .png({ quality: 95, force: false })
                .webp({ quality: 95, lossless: true, force: false })
                .toFile(
                  path.dirname(image.path) +
                    "/" +
                    path.basename(image.path, path.extname(image.path)) +
                    "-" +
                    size.name +
                    path.extname(image.path),
                  function(err, info) {
                    if (err) {
                      reject(err);
                    }
                    resolve(info);
                  }
                );
            });
          })
        );
      } else {
        return Promise.all(
          constants.image.blog.sizes.map(size => {
            return new Promise((resolve, reject) => {
              sharp(image.path)
                .resize(size.width, size.height)
                .jpeg({ quality: 95, force: false })
                .png({ quality: 95, force: false })
                .webp({ quality: 95, lossless: true, force: false })
                .toFile(
                  path.dirname(image.path) +
                    "/" +
                    path.basename(image.path, path.extname(image.path)) +
                    "-" +
                    size.name +
                    path.extname(image.path),
                  function(err, info) {
                    if (err) {
                      reject(err);
                    }
                    resolve(info);
                  }
                );
            });
          })
        );
      }
    })
  );
}
