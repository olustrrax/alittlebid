'use strict'
module.exports = function(app){
    var userList = require('../controllers/userListControllers')

    app.route('/register')
                .post(userList.register)
}