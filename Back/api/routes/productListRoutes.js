'use strict'
module.exports = function(app){
    var productList = require('../controllers/productListControllers')
    var assignList = require('../controllers/assignProductControllers')
    app.route('/bid')
                .post(productList.BidItem)
    app.route('/assign/:type')
                .post(assignList.assign)
    app.route('/productstatus')
                .post(productList.checkProductState)
    
}