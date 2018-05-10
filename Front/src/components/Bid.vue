<template>
    <div>
            <input type="text" v-model="formData.price" class="form-control" placeholder="10">
            <br>
            <button @click="startBid">Bid</button>

            <p>{{oldUser}}</p>
            <br>
            <p>{{newUser}}</p>
        
    </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: "sentmail",
  data(){
      return{
          formData:{
              price: '',
          },
          items:{
              type: 'Shirt',
              id :'-LBWPGr-R0K-kv739RF4',
          },
          itemData:[],
          oldUser:[],
          newUser:[],
      }
  },
  methods:{
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
            var userId = firebase.auth().currentUser.uid
            axios.post('http://localhost:8081/bid',Bid)
            .then(res=>{
                new Promise((resolve,reject)=>{
                    console.log('Bit return : '+ res.data.message)
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
                            this.updateOldBidder(bithist.key)
                        })
                        .catch(biterr=>{
                            reject()
                        })
                    }
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
      },
      updateOldBidder(key){
        axios.get('http://localhost:8081/change/'+this.oldUser[0].Current_Bit+'/'+this.itemData[0].Current_Price)
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
      updateNewBidder(){
          axios.get('http://localhost:8081/calculateBit/'+this.newUser[0].Current_Bit+'/'+this.formData.price)
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
          })
          .catch(err=>{
              console.log(err)
              reject()
          })
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
      firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
      .once("value",snapshot=>{
          this.newUser =[]
          this.newUser.push(snapshot.val())
      })
      
      firebase.database().ref('Products').child(this.items.type).child(this.items.id)
      .once("value",snapshot=>{
          this.itemData =[]
          this.itemData.push(snapshot.val())
          console.log(this.itemData)
          console.log('mouted : '+this.itemData[0].Max_Bidder)

          firebase.database().ref('Users').child(snapshot.val().Max_Bidder)
          .once("value",snapshot=>{
          this.oldUser = []
          this.oldUser.push(snapshot.val())
      })
      })
  },
  mounted(){
      
  }
}
</script>

<style>

</style>

