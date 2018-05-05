'use strict'
var firebase = require('firebase')
exports.listAllUsers = function(req, res){
    var query = { sort: { Firstname: 1 } }
    User.find({}, null, query, function(err, user){
        if(err) throw err
        // console.log(user)
        res.json(user)
    })
}

exports.register = (req,res)=>{
    var newUser = req.body
    console.log(req.body)
    var returnData ={
        message:'',
    }
    console.log(newUser.Email+' '+newUser.Password)
    firebase.auth().createUserWithEmailAndPassword(newUser.Email,newUser.Password)
            .then( user=> {
                console.log('create')
                firebase.database().ref("Users").child(user.uid).set({
                    Account_No:newUser.Account_No,
                    Current_Bit:"0",
                    Email:newUsers.Email,
                    Firstname:netUser.Firstname,
                    Lastname:newUser.Lastname,
                    Image:"null",
                    Password:newUser.Password,
                    Tel:newUser.Telephone,
                    Total_Bit:"0",
                    Username:newUser.Displayname
                })
                .then( res =>{
                    console.log(res)
                    this.returnData.message='success'
                } )
            })
            .catch( e =>{
                console.log("create :"+ e)
                alert(e.message)
            })
            console.log(returnData)
            
}