const passportService = require("../services/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const product = require('../models/product');

const { validateBody, schemas } = require('../validates/userCheck');

module.exports = (app) => {

    //everyone
    app.get('/api/products', product.productList);
    app.get('/api/product/:product_id', product.productGet);
    app.get('/api/image/:imagename', product.getImage);

    //admin
    app.post('/api/admin/products', requireAuth, product.productAdd);
    // app.post('/api/admin/prodcuts', requireAuth, advertising.getDirectory);
    // app.delete('/api/admin/product/:productid', requireAuth, )
}