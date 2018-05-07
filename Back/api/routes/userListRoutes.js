'use strict'
module.exports = function(app){
    var userList = require('../controllers/userListControllers')

    app.route('/register')
                .post(userList.register)

    app.route('/signin')
                .post(userList.signIn)

    app.route('/mailverify')
                .post(userList.verify)

    app.route('/updateoldbidder')
                .post(userList.updateOldBidder)

    app.route('/updatenewbidder')
                .post(userList.updateNewBidder)

    app.route('/user/:userId')
                .get(userList.getUser)
                .post(userList.updateBit)
}