const Joi = require('joi');
//const Reg = require('../helpers/validationReg');
var d = new Date();
var n = d.getFullYear();

const email = Joi.string().email({ minDomainAtoms: 2 });
const birthyear = Joi.number().integer().min(1870).max(n - 2);
//const password = Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/);
const fname = Joi.string().regex(Reg.Name);
const lname = Joi.string().regex(Reg.Name);
const password = Joi.string().regex(Reg.Password);
const passwordLogin = Joi.string().regex(Reg.Password);
const gender = Joi.string().regex(Reg.Gender);
const code_type = Joi.string().regex(/^1|^2{1}$/);
const code_rqrp = Joi.string().regex(/^1|^2{1}$/);
const code_code = Joi.string().regex(Reg.VerifyCode).allow('');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        //console.log(result.error);
        //return res.status(400).send({ 'error': 'validation error' });
        if (process.env.NODE_ENV === 'production') {

        console.log(result.error);
          return res.status(400).send({ 'error': 'validation error' });
        } else {
          return res.status(400).send(result.error);
        }
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    createUser: Joi.object().keys({
      email: email.required(),
      fname: fname.required(),
      lname: lname.required(),
      birthyear: birthyear.required(),
      password: password.required(),
      gender: gender.required()
    }),
    loginUser: Joi.object().keys({
      username: email.required(),
      password: passwordLogin.required()
    }),
    generateCode: Joi.object().keys({
      type: code_type.required(),
      rqrp: code_rqrp.required(),
      usermail: email.required(),
      code: code_code.allow('')
    }),
    passChange: Joi.object().keys({
      usermail: email.required(),
      pass: passwordLogin.required()
    })
  }
}