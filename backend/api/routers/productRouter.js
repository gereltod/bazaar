const passportService = require("../services/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const product = require('../models/product');

const { validateBody, schemas } = require('../validate/userCheck');

module.exports = (app) => {

    //mobile
    app.get('/api/products', advertising.getAdv);
    app.patch('/api/product/add', advertising.logAdv);

    //web
    app.get('/api/admin/products', requireAuth, advertising.listWebAdv);
    app.post('/api/admin/prodcuts', requireAuth, advertising.getDirectory);
    app.patch('/api/Web/Adv/status', requireAuth, advertising.updateAdvStatus);
    app.delete('/api/admin/product/:productid', requireAuth, )
}