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
                  Bit_Amount:this.formData.price,
                  P_ID:this.items.id,
                  U_ID:userId
              }
              var userId = firebase.auth().currentUser.uid
              axios.post('http://localhost:8081/bid',Bid)
              .then(res=>{
                  console.log(res.data)
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
    
      console.log(this.items.type+" "+this.items.id)
      axios.get('http://localhost:8081/user/'+firebase.auth().currentUser.uid)
      .then(response=>{
          this.newUser.push(response.data)
      })  
  },
  mounted(){
        axios.get('http://localhost:8081/product/'+this.items.type+'/'+this.items.id)
        .then(response =>{
            response.data.forEach(element => {
                console.log(element)
                this.itemData.push(element)
            });
        })
  }
}
</script>

<style>

</style>

