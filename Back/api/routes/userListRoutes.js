'use strict'
module.exports = function(app){
    var userList = require('../controllers/userListControllers')
    var assignList = require('../controllers/assignProductControllers')
    app.route('/register')
                .post(userList.register)
    app.route('/assign/:type')
                .post(assignList.assign)
    app.route('/search/:type')
                .get(assignList.allProduct)
}