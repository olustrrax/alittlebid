'use strict'
module.exports = function(app){
    var userList = require('../controllers/userListControllers')

    app.route('/calculateBit/:total_bit/:price')
                .get(userList.calculateBit)

    app.route('/change/:current_bit/:price')
                .get(userList.changeBit)

    app.route('/refill/:current_bit/:total_bit/:refill_bit')
                .get(userList.refill)
}