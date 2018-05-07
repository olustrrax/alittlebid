'use strict'
var firebase = require('firebase')
exports.assign = (req,res)=>{
        var Productref = firebase.database().ref("Products/"+req.params.type);
        Productref.push(req.body);
}

exports.allProduct = (req,res) => {
    console.log(req.params.type)
    var ref = firebase.database().ref("Products/"+req.params.type);
    ref.on("value", function(snapshot) {
        res.json(snapshot.val())
     }, function (error) {
        console.log("Error: " + error.code);
     });
     
}