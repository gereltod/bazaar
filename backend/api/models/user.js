const { token } = require("../redis");
const pick = require("lodash/pick");
const Reg = require("../helpers/validationReg");
const keys = require("../config/keys");
const knex = require("../db/knex");

const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

const tokenForUser = async (user, language) => {
  let timestamp = new Date().getTime();
  let code = jwt.encode({ sub: user.user_id, iat: timestamp }, keys.secret);

  if (user.user_id !== null) {
    await token.set(
      user.user_id,
      JSON.stringify({
        userid: user.user_id,
        username: user.username,
        token: code
      })
    );
    //return jwt.encode({ sub: user.userid, iat: timestamp }, keys.secret);
  }
  return code;
};

exports.login = async (req, res, next) => {
  try {
    let body = pick(req.body, ["username", "password"]);
    const usermail = body.username;
    const password = body.password;
    if (!Reg.Email.test(usermail) && usermail.length > Reg.Email_Limit) {
      res
        .status(403)
        .send(JSON.stringify({ validation: "  validation error" }));
    }
    var user_result = await knex("users")
      .where("username", "=", usermail)
      .first();
    if (user_result !== undefined) {
      if (user_result.password !== null) {
        const pass_done = await new Promise((resolve, reject) => {
          bcrypt.compare(password, user_result.password, function(err, done) {
            if (err) reject(err);
            resolve(done);
          });
        });

        //password shalgah
        if (pass_done) {
          let user = {
            user_id: user_result.user_id,
            username: usermail
          };
          let token = await tokenForUser(user, "en");
          user.token = token;
          res.json({ user });
        }else{
          res
          .status(403)
          .send(JSON.stringify({ error: "username and password wrong" }));
        }
      }
    } else {
      res
        .status(403)
        .send(JSON.stringify({ error: "username and password wrong" }));
    }
  } catch (err) {
    console.log("Login exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    let body = pick(req.body, ["username", "password"]);
    const usermail = body.username;
    if (!Reg.Email.test(usermail) && usermail.length > Reg.Email_Limit) {
      res
        .status(403)
        .send(JSON.stringify({ validation: "  validation error" }));
    }

    var users = await knex("users")
      .where("username", "=", usermail)
      .first();
    if (users === undefined) {
      const password = body.password;

      //нууц үг хаш хийх
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) reject(err);

          bcrypt.hash(password, salt, function(err, hash) {
            if (err) reject(err);
            resolve(hash);
          });
        });
      });
      if (hashedPassword) {
        var newUser = {
          username: usermail,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date()
        };

        var id = await knex("users").insert(newUser, "user_id");
        console.log("user_id:", id[0]);
        let user = {
          user_id: id[0],
          username: usermail
        };
        let token = await tokenForUser(user, "en");
        user.token = token;
        res.json({ user });
      } else {
        res.status(403).send(JSON.stringify({ error: "  error" }));
      }
    } else {
      res.status(403).send(JSON.stringify({ error: "  exists email" }));
    }
  } catch (err) {
    console.log("Login exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};
