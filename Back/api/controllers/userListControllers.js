'use strict'
var firebase = require('firebase')

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

exports.changeBit=(req,res)=>{
    try{
        var total = parseInt(req.params.current_bit)+parseInt(req.params.price)
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

exports.refill=(req,res)=>{
    try{
        var current_bit = parseInt(req.params.current_bit)+parseInt(req.params.refill)
        var total_bit   = parseInt(req.params.total_bit)+parseInt(req.params.refill)
        res.json({
            status:'success',
            current_bit:current_bit,
            total_bit:total_bit
        })
    }
    catch(err){
        res.json({
            status:'fail',
            message:err
        })
    }
}