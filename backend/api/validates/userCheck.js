const Joi = require('joi');
const Reg = require('../helpers/validationReg');

const email = Joi.string().email({ minDomainAtoms: 2 });
const password = Joi.string().regex(Reg.Password);
const passwordLogin = Joi.string().regex(Reg.Password);

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        if (process.env.NODE_ENV === 'production') {
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
      username: email.required(),
      password: password.required()
    }),
    loginUser: Joi.object().keys({
      username: email.required(),
      password: passwordLogin.required()
    }),
  }
}