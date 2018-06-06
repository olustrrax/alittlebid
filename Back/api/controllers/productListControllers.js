'use strict'
var firebase = require('firebase')
var moment   = require('moment')
var time     = require('time')

exports.BidItem = (req,res)=>{
    var endDate = new Date(req.body.date_end+" "+req.body.time_end)
    var currentDate = new time.Date()
    var nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok'
  });
  var endDate2 =  req.body.date_end+" "+req.body.time_end
var x1 =  moment(endDate2, 'MM/DD/YYYY HH:mm:ss A').format('DD/MM/YYYY HH:mm:ss');
var x2 = moment(nDate, 'MM/DD/YYYY HH:mm:ss A').format('DD/MM/YYYY HH:mm:ss');
var ms = moment(x1,"DD/MM/YYYY HH:mm:ss").diff(moment(x2,"DD/MM/YYYY HH:mm:ss"));
var d = moment.duration(ms);
var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
console.log("Milisec " + ms)
    currentDate.setTimezone("Asia/Bangkok")
    var price = parseInt(req.body.price)
    var current_bit = parseInt(req.body.user_current_bit)
    var current_price = parseInt(req.body.current_price)
    console.log(endDate+"  and "+currentDate.toLocaleString())
    if(req.body.uid==req.body.cur_uid||req.body.cur_uid==req.body.max_bidder)
    {
        res.json({
            status:'fail',
            message:'you can`t bid this item'
        })
        return
    }
    else{
        if(ms<0)
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
                if(ms <= 1728000)
                {
                    console.log('aa')
                    var newtime  = new time.Date()
                    currentDate.setTimezone("Asia/Bangkok")
                    newtime.setTime(endDate.getTime()+(30*60*1000))
                    res.json({
                        status:'success',
                        message:'add 30 minute',
                        newEndDate:moment(newtime).format('MM/DD/YYYY'),
                        newEndTime:moment(newtime).format('HH:mm:ss A'),
                        currentDate:moment(x2,'DD/MM/YYYY HH:mm:ss').format('MM/DD/YYYY'),
                        currentTime:moment(x2,'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss A')
                    })
                }
                else{
                    res.json({
                            status:'success',
                            message:'',
                            currentDate:moment(x2,'DD/MM/YYYY HH:mm:ss').format('MM/DD/YYYY'),
                        currentTime:moment(x2,'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss A')
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
    var endDate = new time.Date(req.body.Date_End+" "+req.body.Time_End)
    var currentDate = new time.Date()
    console.log(req.body.Name)
    var nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok'
  });
  var endDate2 =  req.body.Date_End+" "+req.body.Time_End
var x1 =  moment(endDate2, 'MM/DD/YYYY HH:mm:ss A').format('DD/MM/YYYY HH:mm:ss');
var x2 = moment(nDate, 'MM/DD/YYYY HH:mm:ss A').format('DD/MM/YYYY HH:mm:ss');
var ms = moment(x1,"DD/MM/YYYY HH:mm:ss").diff(moment(x2,"DD/MM/YYYY HH:mm:ss"));
var d = moment.duration(ms);
var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
console.log("End " + x1)
console.log("Cur "+x2)
console.log(ms)
    if(ms <= 0)
    {
        console.log('End')
        res.json({
            status:'success',
            message:'end'
        })
    }
    else if(ms > 0)
    {
        console.log('Yet')
        res.json({
            status:'success',
            message:'Yet'
        })
    }
    else{
        console.log('WTF')
        res.json({
            status:'fail',
            message:''
        })
    }

}