const passportService = require("../services/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const basket = require('../models/basket');

const { validateBody, schemas } = require('../validates/userCheck');

module.exports = (app) => {

    //everyone
    app.get('/api/baskets',requireAuth, basket.basketList);
    app.post('/api/basket',requireAuth, basket.addBasket);

}