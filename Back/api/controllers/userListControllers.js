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
            
exports.signIn = (req,res)=>{
    firebase.auth().signInWithEmailAndPassword(req.body.Email,req.body.Password)
                    .then(user =>{
                        var obj ={
                            status: 'success',
                            message: ''
                        }
                        res.json(obj)
                    })
                    .catch(e=>{
                        var obj ={
                            status: 'fail',
                            message : e.message
                        }
                        res.json(obj)

                    })
}

exports.verify = (req,res)=>{
    var actionCodeSettings = {
        url: 'http://localhost:8080/#/register',
        handleCodeInApp: true,
        };
        firebase.auth().sendSignInLinkToEmail(req.body.Email, actionCodeSettings)
        .then( response =>{
            var obj ={
                status:'success',
                message:''
            }
            res.json(obj)
            // window.localStorage.setItem('emailForSignIn', this.formData.email);

        })
        .catch(function(error) {
            console.log(error)
            var obj={
                status:'fail',
                message:error.message
            }
            res.json(obj)
        });
}

exports.updateOldBidder = (req,res) =>{
    var itemId = req.body.id
    // console.log(itemId)
    var change = parseInt(req.body.Current_Price)+parseInt(req.body.Current_Bit)
    firebase.database().ref('Users').child(req.body.Max_Bidder).update({
        // Bit_History:{
        //       itemId:'failed'
        // },
        Current_Bit:change
        })
        .then( user =>{
            firebase.database().ref('Users').child(req.body.Max_Bidder).child('Bit_History')
            .child(itemId).set({
                status:'failed'
            })
            .then( bitRes => {
                var obj ={
                    status:'success',
                    message:''
                }
                res.json(obj)
            })
            
        })
}

exports.updateNewBidder = (req,res) => {
    var itemId = req.body.id
    var total = parseInt(req.body.Current_Bit)-parseInt(req.body.Current_Price)
    firebase.database().ref('Users').child(req.body.User_ID).update({
        Current_Bit:total
    })
    .then(user=>{
        firebase.database().ref('Users').child(req.body.User_ID).child('Bit_History')
        .child(itemId).set({
            status:req.body.Current_Price
        })
        .then(bitRes=>{
            var obj ={
                status:'success',
                message:''
            }
            res.json(obj)
        })
    })
}

exports.getUser=(req,res)=>{
    firebase.database().ref('Users').child(req.params.userId)
    .on("value",snapshot=>{
          console.log(snapshot.val())
          res.json(snapshot.val())
    })
}

exports.updateBit=(req,res)=>{
    var total = parseInt(req.body.Current_Bit) - parseInt(req.body.Price) 
    firebase.database().ref('Users').child(req.params.userId)
    .update({
        Total_Bit:total
    })
    .then(user => {
        firebase.database().ref('Users').child(req.params.userId).child('Bit_History')
        .child(req.body.itemId).update({
            status:'completed'
        })
        .then(hist =>{
            res.json({
                status:'success',
                message:''
            })
        })
    })
}