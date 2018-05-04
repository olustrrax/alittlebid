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
          console.log('click')
        //   if(this.itemData.Start_Bid < this.formData.price)
        //   {
              var currentDate = new Date()
              var day = currentDate.getDate()
              var month = currentDate.getMonth()
              var year = currentDate.getFullYear()
              var time = currentDate.getTime()
              var userId = firebase.auth().currentUser.uid
              console.log(day+'/'+month+'/'+year+' '+time+'  '+userId)
              firebase.database().ref('Bits').push({
                  Bit_Amount:this.formData.price,
                  Date:day+'/'+month+'/'+year,
                  P_ID:this.items.id,
                  Time:time,
                  U_ID:userId
              })
              .then( res => {
                  console.log(res)
              })
              .catch( err => {
                  console.log(err)
              })
        //   }
      },
      updateOldBidder(){
          var itemId = this.items.id
          var change = parseInt(this.itemData.Current_Price)+parseInt(this.oldUser.Current_Bit)
          firebase.database().ref('Users').child(itemData.Max_Bidder).set({
              Bit_History:{
                  itemId:'failed'
              },
              Current_Bit:change
          })
      },
      updateProduct(){
          firebase.database().ref('Products').child(this.items.type).child(this.items.id)
          .set({
              Current_Price:this.formData.price,
              Max_Bidder:firebase.auth().currentUser.uid
          })
      },
      updateNewBidder(){
          
      }
  },
  created(){
    
      console.log(this.items.type+" "+this.items.id)
      firebase.database().ref('Products').child(this.items.type).child(this.items.id)
      .on("value",snapshot=>{
          this.itemData.push(snapshot.val())
          console.log(this.itemData)
          console.log(this.itemData[0].Max_Bidder)
            firebase.database().ref('Users').child(this.itemData[0].Max_Bidder)
            .on("value",snapshot=>{
                console.log('oldUsers')
                this.oldUser.push(snapshot.val())
            })

      })

      firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
      .on("value",snapshot=>{
          this.newUser.push(snapshot.val())

          console.log(this.newUser)
          console.log(this.newUser[0].Firstname)

      })
  },
  mounted(){
        // console.log(this.itemData)
        // firebase.database().ref('Users').child(this.itemData.Max_Bidder)
        // .on("value",snapshot=>{
        //     console.log('oldUsers')
        //     this.oldUser.push(snapshot.val())
        // })
  }
}
</script>

<style>

</style>

