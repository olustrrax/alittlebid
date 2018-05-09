'use strict'
module.exports = function(app){
    var userList = require('../controllers/userListControllers')

    app.route('/updateoldbidder')
                .post(userList.updateOldBidder)

    app.route('/updatenewbidder')
                .post(userList.updateNewBidder)

    app.route('/user/:userId')
                .post(userList.updateBit)

    app.route('/calculateBit/:total_bit/:price')
                .get(userList.calculateBit)
}