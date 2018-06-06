<template>
    <div id="bid">
        <div class="register">
            <div class="ui segment">
                <div class="ui centered grid">
                    <div class="six wide column">
                        <div class="ui segment">
                            <div class="ui image">
                                <div class="image-preview" >
                                    <img class="preview" :src="itemData[0].Image[0]">
                                </div>
                            </div>
                        </div>
                        <h1 id="head">เจ้าของสินค้า : {{ownerData[0].Firstname}}  {{ownerData[0].Lastname}}</h1>
                    </div>
                    <div class="eight wide column">
                        <div class="ui segment">
                            <div class="ui huge header" id="head">{{itemData[0].Name}}</div>
                            <div class="ui divider"></div>
                            <div class="ui content">
                                {{itemData[0].Description}}
    
                            </div>
                        </div>
                        <div class="ui segment">
                            <div class="row">
                            <div v-if = "itemData[0].Max_Bidder != 'NULL'" class="big ui green tag label">ราคาบิดในปัจจุบัน : {{itemData[0].Current_Price}}
                                <br><br>
                                <span id="font"> ผู้ประมูล : {{oldUser[0].Firstname}} {{oldUser[0].Lastname}}</span>
                            </div>
                            </div>
                            <div class="row">
                                <div v-if = "itemData[0].Max_Bidder === 'NULL'" class="big ui green tag label">ราคาเริ่มต้น : {{itemData[0].Current_Price}} 
                                <br><br>
                                <span id="font">   ยังไม่มีผู้ประมูล </span>
                                </div>
                            </div>
                            
                            <div class="ui divider"></div>
                            <div class="ui huge red header" v-if="datenow != 0" id="head">
                                {{datenow}} ชั่วโมง 
                            </div>
                            <div class="ui huge red header" v-if="datenow == 0">
                                การประมูลสินค้านี้สิ้นสุดแล้ว 
                            </div>
                            <div class="ui labeled" tabindex="0">
                                <div class="large ui green label">
                                    <i class="bitcoin icon"></i> จำนวนบิตที่คุณมีอยู่
                                </div>
                                <a class="large ui basic label">
                                    {{newUser[0].Current_Bit}} บิต
                                </a>
                            </div>
                            <br><br>
                            <div class="error" v-if="itemData[0].Status !== 'end'">
                            <div class="ui right floated action input">
                                <input type="text" v-validate="'numeric'" data-vv-validate-on="change|custom" placeholder="ราคาประมูลของุ" name="price" v-model="formData.price">
                                
                                
                            </div>
                            <div class="ui orange button" v-if="!lock" @click="check">BID</div>
                            <div class="ui gray button" v-if="lock"  @click="alertTimeOut">BID</div>
                            <span style="color:red;"  v-if="errors.has('price') || error == 1">
                                   กรุณากรอกตัวเลขให้ถูกต้อง
                            </span>
                            </div>
                        </div>
                        
                        
                    </div>
       
                </div>
                <div class="ui inverted segment">
                    <div class="sixteen wide column">
                        <div class="ui tabular menu">
                            <a class="item active">
                                รูปภาพสินค้า  
                            </a>
                        </div>
                        <div class="ui bottom attached segment">
                            <div class="row">
                                <div class="ui small bordered images">
                                    <img v-for="image in itemData[0].Image" :src="image">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
        
        
    </div>
  
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: "bid",
  props:['items'],
  data(){
      return{
          error: 0,
          lock:false,
          datenow: '',
          formData:{
              price: '',
          },
        //   items:{
        //       type: 'Backpack',
        //       id :'-LC9-Jy0RhEJ6PQ-e8mp',
        //   },
          itemData:[],
          oldUser:[],
          newUser:[],
          imageData: [],
          ownerData:[]
      }
  },
  methods:{
      check(){
          
          this.$validator.validateAll().then((result)=>{
                if(this.formData.price > 0 && (this.formData.price % 1 ===0) && this.itemData[0].Current_Price < this.formData.price ){
                    this.error = 0
                    this.startBid()
                }
                else if(this.formData.price == 0){
                     this.error = 1
                }
                else {
                     this.error = 1
                //   console.log("Not valid") 
                //     swal({
                //         title: "กรุณากรอกจำนวนให้ถูกต้อง",
                //         dangerMode: true,
                //         icon: "warning",
                //         button: "Close",
                //     });
                //     swal.stopLoading();
                //     swal.close();
                }
          }) 
      },
      previewImage: function(event) {
            var input = event.target;
            for(let i = 0;i<input.files.length;i++)
            {
                if (input.files && input.files[i]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                }
                reader.readAsDataURL(input.files[i]);
            }
            }
            
        },
      startBid(){
            let Bid ={
                price:this.formData.price,
                current_price:this.itemData[0].Current_Price,
                user_current_bit:this.newUser[0].Current_Bit,
                date_end:this.itemData[0].Date_End,
                time_end:this.itemData[0].Time_End,
                uid:this.itemData[0].U_ID,
                max_bidder:this.itemData[0].Max_Bidder,
                cur_uid:firebase.auth().currentUser.uid
            }
            console.log("Test")
                if(isNaN(parseInt(Bid.price))) {
                      console.log("Not valid")
                        swal({
                            title: "กรุณากรอกข้อมูลให้ถูกต้อง",
                            dangerMode: true,
                            icon: "warning",
                            button: "Close",
                        });
                        swal.stopLoading();
                        swal.close();
                    }
                    else
                    {
                        console.log(Bid)
                        axios.post('http://alittlebid-mangese.c9users.io:8081/bid',Bid)
                        .then(res=>{
                            new Promise((resolve,reject)=>{
                                console.log('Bit return : '+ res.data)
                                if(res.data.status=='success')
                                {
                                    if(res.data.message=='add 30 minute')
                                    {
                                        firebase.database().ref('Products').child(this.items.type).child(this.items.id)
                                        .update({
                                            Date_End:res.data.newEndDate,
                                            Time_End:res.data.newEndTime
                                        })
                                    }
                                
                                    firebase.database().ref('Bits').push({
                                        Bit_Amount:this.formData.price,
                                        Date:res.data.currentDate,
                                        P_ID:this.items.id,
                                        Time:res.data.currentTime,
                                        U_ID:firebase.auth().currentUser.uid
                                    })
                                    .then(bithist=>{
                                        if(this.itemData[0].Max_Bidder!="NULL")
                                        {
                                            this.updateOldBidder(bithist.key)
                                        }
                                        else{
                                            this.updateNewBidder()
                                        }
                                    })
                                    .catch(biterr=>{
                                        reject()
                                    })
                        }
                }).catch((e)=>{
          alert(e.message)
        })
                .then(promise=>{
                    console.log('Bid success')
                })
                .catch(promise=>{
                    console.log('Bid failed')
                    this.reverse()
                })
                
            })
            .catch(err=>{
                console.log(err)
                
            })
                    }
      },
      updateOldBidder(key){
        axios.get('http://alittlebid-mangese.c9users.io:8081/change/'+this.oldUser[0].Current_Bit+'/'+this.itemData[0].Current_Price)
        .then(res=>{
            firebase.database().ref('Users').child(this.itemData[0].Max_Bidder).update({
                Current_Bit:res.data.message
            })
            .then( user =>{
                firebase.database().ref('Users').child(this.itemData[0].Max_Bidder).child('Bit_History')
                .child(this.items.id).set({
                    status:'failed'
                })
                .then(stat=>{
                    console.log('updateOld end')
                    this.updateNewBidder()
                })
                .catch(err=>{
                    reject()
                })
            })
            .catch( usererr=>{
                reject()
            })
        })
          

      },
      alertTimeOut()
      {
          alert("การประมูลได้จบลงแล้ว")
      },
      updateNewBidder(){
          console.log('updatenewuser')
          axios.get('http://alittlebid-mangese.c9users.io:8081/calculateBit/'+this.newUser[0].Current_Bit+'/'+this.formData.price)
          .then(res=>{
              console.log('calbit :'+res.data.status)
              if(res.data.status=='success')
              {
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid).update({
                        Current_Bit:res.data.message
                })
                .then(user=>{
                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid).child('Bit_History')
                        .child(this.items.id).set({
                            status:this.formData.price
                        })
                        .then(bitRes=>{
                            console.log('updateNew end')
                            swal({
                                title: "บิดสำเร็จ!",
                                icon: "success",
                                button: "Close",
                            });
                            swal.stopLoading();
                            swal.close();
                            this.updateProduct()
                        })
                        .catch(biterr=>{
                            reject()
                        })
                })
                .catch(err=>{
                    reject()
                })
              }
          })  
      },
      updateProduct(){
          console.log(this.items.type+" "+this.items.id)
          firebase.database().ref('Products').child(this.items.type).child(this.items.id)
          .update({
                Current_Price:this.formData.price,
                Max_Bidder:firebase.auth().currentUser.uid
          })
          .then(product=>{
              console.log("pro ")
              this.$router.push({name:'Bid',params:{items:this.items}})
            //   this.formData.price = 0
          })
          .catch(err=>{
              console.log(err)
              reject()
          })
      },
      time(){
            var self = this
            var now = this.itemData[0].Date_End+' '+this.itemData[0].Time_End
            var then = moment(new Date,"MM/DD/YYYY HH:mm:ss");
            
            var x1 =  moment(now, 'MM/DD/YYYY HH:mm:ss A').format('DD/MM/YYYY HH:mm:ss');
            var x2 = moment(then, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
            var ms = moment(x1,"DD/MM/YYYY HH:mm:ss").diff(moment(x2,"DD/MM/YYYY HH:mm:ss"));
            var d = moment.duration(ms);
            var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        if(d.asHours()<=0 && ms <= 0)
        {
            this.lock = true;
            this.datenow = 0;
            firebase.database().ref('Products').child(this.items.type).child(this.items.id)
            .update({
                Status:"end"
            })
        }
        else
        {
             this.datenow = s
            setInterval(self.time, 1000)
        }
           
      
    },
      reverse(){
          console.log('reverse')
          new Promise ((resolve,reject)=>{
              firebase.database().ref('Users').child(firebase.auth().currentUser.uid).set(this.newUser[0])
              .then(res=>{
                  console.log('revese new user successed')
              })
              .catch(err=>{
                  console.log('revese fail at new user')
                  reject()
              })

              firebase.database().ref('Users').child(this.itemData[0].Max_Bidder).set(this.oldUser[0])
              .then(res=>{
                  console.log('revese old user successed')
              })
              .catch(err=>{
                  console.log('reverse fail at old user')
                  reject()
              })

              firebase.database().ref('Products').child(this.items.type).child(this.items.id).set(this.itemData[0])
              .then(res=>{
                  console.log('revese product successed')
              })
              .catch(err=>{
                  console.log('reverse fail at product')
                  reject()
              })
          })
          .then(promise=>{
              console.log('reverse success')
          })
          .catch(promise=>{
              console.log('reverse failed')
          })

      }
  },
  created(){
      console.log(new Date)
      firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
      .on("value",snapshot=>{
          this.newUser =[]
          this.newUser.push(snapshot.val())
      })
      
      firebase.database().ref('Products').child(this.items.type).child(this.items.id)
      .on("value",snapshot=>{
          this.itemData =[]
          this.itemData.push(snapshot.val())
          console.log(this.itemData)
          console.log('mouted : '+this.itemData[0].Max_Bidder)
          
          if(this.itemData[0].Max_Bidder!="NULL")
          {
              firebase.database().ref('Users').child(snapshot.val().Max_Bidder)
              .on("value",snapshot=>{
              this.oldUser = []
              this.oldUser.push(snapshot.val())
              
          })
          }
          else{
              console.log("is null")
          }
          
              firebase.database().ref('Users').child(this.itemData[0].U_ID)
              .once("value",snapshot=>{
                  this.ownerData =[]
                  this.ownerData.push(snapshot.val())
              })
      })
  },
  mounted(){
      this.time()
  }
}
</script>

<style>
.eror{
    color: red;
}
#icon{
    width: 20px;
}
#font{
    color: yellow;
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
</style>

