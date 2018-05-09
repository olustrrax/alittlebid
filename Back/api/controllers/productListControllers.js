'use strict'
var firebase = require('firebase')

exports.getProductData = (req,res)=>{
    let itemData =[]
    console.log(req.params.productType)
    console.log(req.params.productID)
    firebase.database().ref('Products').child(req.params.productType).child(req.params.productID)
    .on("value",snapshot=>{
        itemData.push(snapshot.val())
        res.json(itemData)   
    })
}

exports.BidItem = (req,res)=>{
    var endDate = new Date(req.body.date_end+" "+req.body.time_end)
    var currentDate = new Date()
    if(req.body.price<=req.body.current_price)
    {
        return res.json({
            status:'fail',
            message:'please bit more'
        })
    }
    else if(req.body.price>req.body.user.current_bit) 
    {
        return res.json({
            status:'fail',
            message:'you not have bit'
        })
    }
    else if(req.body.price<=req.body.user.current_bit)
    {
        console.log(endDate - currentDate)
        return res.json({
                    status:'success',
                    message:''
                })
    }
    else
    {
        return res.json({
            status:'fail',
            message:''
        })
    }   
    
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














exports.checkProductState=(req,res)=>{
    // console.log(req.body)
    var endDate = new Date(req.body.Date_End+" "+req.body.Time_End)
    // console.log("e : "+endDate)
    // console.log(endDate.toLocaleString())
    var currentDate = new Date()
    // console.log("c : "+currentDate )
    // console.log(currentDate.toLocaleString())
    if(endDate < currentDate)
    {
        // console.log('End')
        res.json({
            status:'success',
            message:'end'
        })
    }
    else if(endDate > currentDate)
    {
        // console.log('Yet')
        res.json({
            status:'success',
            message:'Yet'
        })
    }
    else{
        // console.log('WTF's)
        res.json({
            status:'fail',
            message:''
        })
    }

}