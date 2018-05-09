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
                end_date:this.itemData[0].End_Date,
                end_time:this.itemData[0].End_Time
            }
            var userId = firebase.auth().currentUser.uid
            
            axios.post('http://localhost:8081/bid',Bid)
            .then(res=>{
                    // firebase.database().ref('Bits').push({
                    // Bit_Amount:req.body.Bit_Amount,
                    // Date:day+'/'+month+'/'+year,
                    // P_ID:req.body.P_ID,
                    // Time:time,
                    // U_ID:req.body.U_ID
                // })
            })
            .catch(err=>{
                console.log(err)
            })
      },
      updateOldBidder(){
          var itemId = this.items.id
          var obj = {
              id:itemId,
              Current_Price:this.itemData[0].Current_Price,
              Current_Bit:this.oldUser[0].Current_Bit,
              Max_Bidder:this.itemData[0].Max_Bidder
          }
          axios.post('http://localhost:8081/updateoldbidder',obj)
          .then(res=>{
              console.log(res)
          })
          .catch(err=>{
              console.log(err)
          })
      },
      updateProduct(){
          var obj = {
              Current_Price:this.formData.price,
              Max_Bidder:firebase.auth().currentUser.id
          }
          axios.post('http://localhost:8081/product/'+this.items.type+'/'+this.items.id,obj)
          .then(res=>{
              console.log(res)
          })
          .catch(err=>{
              console.log(err)
          })
      },
      updateNewBidder(){
          var itemId = this.items.id
          var obj = {
              id:itemId,
              Current_Price:this.formData.price,
              Current_Bit:this.newUser[0].Current_Bit,
              User_ID:firebase.auth().currentUser.uid
          }
          axios.post('http://localhost:8081/updatenewbidder',obj)
          .then(res=>{
              console.log(res)
          })
          .catch(err=>{
              console.log(err)
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

