'use strict'
var firebase = require('firebase')
exports.assign = (req,res)=>{
        var Productref = firebase.database().ref("Products/"+req.params.type);
        Productref.push(req.body);
}

exports.allProduct = (req,res) => {
    console.log(req.params.type)
    var ref = firebase.database().ref("Products/"+req.params.type);
    ref.once("value", function(snapshot) {
        return res.send(snapshot.val());
     }, function (error) {
        console.log("Error: " + error.code);
     });
     
}