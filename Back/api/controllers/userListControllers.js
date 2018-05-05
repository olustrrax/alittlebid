'use strict'
var firebase = require('firebase')

exports.register = (req,res)=>{
    firebase.auth().createUserWithEmailAndPassword(req.body.Email,req.body.Password)
            .then( user=> {
                firebase.database().ref("Users").child(user.uid).set({
                    Account_No:req.body.Account_No,
                    Current_Bit:"0",
                    Email:req.body.Email,
                    Firstname:req.body.Firstname,
                    Lastname:req.body.Lastname,
                    Image:"null",
                    Password:req.body.Password,
                    Tel:req.body.Telephone,
                    Total_Bit:"0",
                    Username:req.body.Displayname
                })
                .then( response =>{
                    var obj = {
                        status : 'success',
                        message : ''}
                    res.json(obj)                    
                })
                .catch( error =>{
                    var obj = {
                        status : 'fail',
                        message : ''
                    }
                    res.json(obj)
                })
            })
            .catch( e =>{
                var obj = {
                    status : 'fail',
                    message : e.message
                }
                res.json(obj)
            })
}
            
