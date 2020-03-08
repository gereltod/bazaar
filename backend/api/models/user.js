const { token } = require("../redis");
const pick = require("lodash/pick");
const Reg = require('../helpers/validationReg')
const keys = require('../config/keys');
const knex = require('../db/knex');

const tokenForUser = async (user, language) => {
  let timestamp = new Date().getTime();
  let code = jwt.encode({ sub: user.user_id, iat: timestamp }, keys.secret);
 
  if (user.user_id !== null) {
    await token.set(
      user.Id,
      JSON.stringify({
        userid: user.user_id,
        username: user.email,
        token: code
      })
    );
    //return jwt.encode({ sub: user.userid, iat: timestamp }, keys.secret);
  }
  return code;
};

exports.login = async (req, res, next) => {
  try {
      res.send('OK');
  } catch (err) {
    console.log("Login exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    let body = pick(req.body, ["username", "password"]);

    var users = await knex('users').where('username', '=', body.username).first();
    console.log(users);
    if(users === undefined){
      var newUser = {
        'username':body.username,
        'password':body.password
      }

      var id = await knex('users').insert(newUser, 'user_id');
      console.log('user_id:', id[0]);
    }
    res.json(users);

    const usermail = body.username;
    if (!Reg.Email.test(usermail) && usermail.length > Reg.Email_Limit) {
      res
        .status(403)
        .send(JSON.stringify({ validation: "  validation error" }));
    }


  } catch (err) {
    console.log("Login exception", err);
    return res.status(500).send({ status: -1, error: "err" });
  }
};
