'use strict'
var firebase = require('firebase')

exports.updateOldBidder = (req,res) =>{
    var itemId = req.body.id
    var change = parseInt(req.body.Current_Price)+parseInt(req.body.Current_Bit)
    firebase.database().ref('Users').child(req.body.Max_Bidder).update({
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





exports.calculateBit=(req,res)=>{
    try{
        var total = parseInt(req.params.total_bit)-parseInt(req.params.price)
        res.json({
            status:'success',
            message:total
        })
    }
    catch(err){
        res.json({
            status:'fail',
            message:err
        })
    }
    
}