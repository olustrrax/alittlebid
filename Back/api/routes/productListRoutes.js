'use strict'
module.exports = function(app){
    var productList = require('../controllers/productListControllers')

    app.route('/bid')
                .post(productList.BidItem)

    app.route('/productstatus')
                .post(productList.checkProductState)
    
}