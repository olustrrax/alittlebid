'use strict'
var firebase = require('firebase')

exports.getProductData = (req,res)=>{
    console.log("product")
    let itemData =[]
    console.log(req.params.productType)
    console.log(req.params.productID)
    console.log("1")
    firebase.database().ref('Products').child(req.params.productType).child(req.params.productID)
    .on("value",snapshot=>{
        itemData.push(snapshot.val())
        console.log("2")
        res.json(itemData)   
    })
    console.log("3")
}

exports.BidItem = (req,res)=>{
    console.log('Bid')
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth()
    var year = currentDate.getFullYear()
    var time = currentDate.getTime()

    firebase.database().ref('Bits').push({
        Bit_Amount:req.body.Bit_Amount,
        Date:day+'/'+month+'/'+year,
        P_ID:req.body.P_ID,
        Time:time,
        U_ID:req.body.U_ID
    })
    .then( response => {
        // console.log(res)
        res.json({
            status:'success',
            message:''
        })
    })
    .catch( err => {
        // console.log(err)
        res.json({
            status:'fail',
            message:err.message
        })
    })
}

exports.updateProduct=(req,res)=>{
    firebase.database().ref('Products').child(req.params.productType).child(req.params.productID)
          .update({
              Current_Price:req.body.Current_Price,
              Max_Bidder:req.body.Max_Bidder
          })
          .then(product=>{
            res.json({
                status:'success',
                message:''
            })
          })
          .catch(err=>{
              res.json({
                  status:'fail',
                  message:err.message
              })
          })
}

exports.getWinProduct=(req,res)=>{
    var userID = req.body.id
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth()
    var year = currentDate.getFullYear()
    var time = currentDate.getTime()

    var obj = []

    var keys =["Pant","Shirt","Backpack","Shoes","Watch"]
    
    Promise.all(keys.forEach(item=>{
        firebase.database().ref('Products/'+item)
        .orderByChild('Max_Bidder').equalTo(userID).on("value",snapshot=>{
            snapshot.forEach(element=>{
                console.log(element.key)
                obj.push(element.key)
            })
        
        })
    }))
    .then(promise=>{
            console.log('promise end')
            res.json(obj)
    })
        
   
    
    
}