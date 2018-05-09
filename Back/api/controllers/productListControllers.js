'use strict'
var firebase = require('firebase')

exports.BidItem = (req,res)=>{
    var endDate = new Date(req.body.date_end+" "+req.body.time_end)
    var currentDate = new Date()
    var price = parseInt(req.body.price)
    var current_bit = parseInt(req.body.user_current_bit)
    var current_price = parseInt(req.body.current_price)
    if(req.body.uid==req.body.cur_uid||req.body.cur_uid==req.body.max_bidder)
    {
        res.json({
            status:'fail',
            message:'you can`t bid this item'
        })
        return
    }
    else{
        if(currentDate>=endDate)
        {
            res.json({
                status:'fail',
                message:'this bit is end'
            })
            return
        }
        else{
            if(price<=current_price)
            {
                res.json({
                    status:'fail',
                    message:'please bit more'
                })
                return
            }
            else if(price>current_bit) 
            {
                console.log("cur_bit "+current_bit)
                res.json({
                    status:'fail',
                    message:'you not have bit'
                })
                return
            }
            else if(price<=current_bit)
            {
                console.log(endDate - currentDate)
                if(endDate - currentDate <= 1728000)
                {
                    console.log('aa')
                    var newtime  = new Date()
                    newtime.setTime(endDate.getTime()+(30*60*1000))
                    console.log("new: "+newtime.toLocaleString('en-US', { 
                        month:'numeric',day:'numeric',year:'numeric',
                        hour: 'numeric', minute: 'numeric', second:'numeric' ,hour12: true }))
                    res.json({
                        status:'success',
                        message:'add 30 minute',
                        newEndDate:newtime.toLocaleString('en-Us',{ month:'numeric',day:'numeric',year:'numeric' }),
                        newEndTime:newtime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric' ,hour12: true }),
                        currentDate:currentDate.toLocaleString(),
                        currentTime:currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric' ,hour12: true })
                    })
                }
                else{
                    res.json({
                            status:'success',
                            message:'',
                            currentDate:currentDate.toLocaleString(),
                            currentTime:currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric' ,hour12: true })
                    })
                }
                
                return
            }
            else
            {
                res.json({
                    status:'fail',
                    message:''
                })
                return
            }
        }  
    }  
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