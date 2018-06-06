<template>
    <div class="row">
        <h1>Shirt</h1>
        <div v-for="Item,key,index in this.Shirt" v-if="index < 3" >
        Name : {{Item.Name}}
        Bid Increse: {{Item.Bid_Increse}}
        Current Price: {{Item.Current_Price}}
        Date End : {{Item.Date_End}}
        Date Start :{{Item.Date_Start}}
        Description : {{Item.Description}}
        <div class="image-preview" v-for="image in Item.Image">
                <img class="preview" :src="image">
            </div>
        Max Bidder : {{Item.Max_Bidder}}
        Start Bid : {{Item.Start_Bid}}
        Time End : {{Item.Time_End}}
        Time Start : {{Item.Time_Start}}
        Owner : {{Item.U_ID}}
        
        <br>
        </div>
                <h1>Pant</h1>

        <div v-for="Item,key,index in this.Pant" v-if="index < 3" >
        Name : {{Item.Name}}
        Bid Increse: {{Item.Bid_Increse}}
        Current Price: {{Item.Current_Price}}
        Date End : {{Item.Date_End}}
        Date Start :{{Item.Date_Start}}
        Description : {{Item.Description}}
        <div class="image-preview" v-for="image in Item.Image">
                <img class="preview" :src="image">
            </div>
        Max Bidder : {{Item.Max_Bidder}}
        Start Bid : {{Item.Start_Bid}}
        Time End : {{Item.Time_End}}
        Time Start : {{Item.Time_Start}}
        Owner : {{Item.U_ID}}
        
        <br>
        </div>
                <h1>Shoes</h1>

        <div v-for="Item,key,index in this.Shoes" v-if="index < 3" >
        Name : {{Item.Name}}
        Bid Increse: {{Item.Bid_Increse}}
        Current Price: {{Item.Current_Price}}
        Date End : {{Item.Date_End}}
        Date Start :{{Item.Date_Start}}
        Description : {{Item.Description}}
        <div class="image-preview" v-for="image in Item.Image">
                <img class="preview" :src="image">
            </div>
        Max Bidder : {{Item.Max_Bidder}}
        Start Bid : {{Item.Start_Bid}}
        Time End : {{Item.Time_End}}
        Time Start : {{Item.Time_Start}}
        Owner : {{Item.U_ID}}
        
        <br>
        </div>
                <h1>Watch</h1>

        <div v-for="Item,key,index in this.Watch" v-if="index < 3" >
        Name : {{Item.Name}}
        Bid Increse: {{Item.Bid_Increse}}
        Current Price: {{Item.Current_Price}}
        Date End : {{Item.Date_End}}
        Date Start :{{Item.Date_Start}}
        Description : {{Item.Description}}
        <div class="image-preview" v-for="image in Item.Image">
                <img class="preview" :src="image">
            </div>
        Max Bidder : {{Item.Max_Bidder}}
        Start Bid : {{Item.Start_Bid}}
        Time End : {{Item.Time_End}}
        Time Start : {{Item.Time_Start}}
        Owner : {{Item.U_ID}}
        
        <br>
        </div>
                <h1>Backpack</h1>

        <div v-for="Item,key,index in this.Backpack" v-if="index < 3" >
            {{index}}
        Name : {{Item.Name}}
        Bid Increse: {{Item.Bid_Increse}}
        Current Price: {{Item.Current_Price}}
        Date End : {{Item.Date_End}}
        Date Start :{{Item.Date_Start}}
        Description : {{Item.Description}}
        <div class="image-preview" v-for="image in Item.Image">
                <img class="preview" :src="image">
            </div>
        Max Bidder : {{Item.Max_Bidder}}
        Start Bid : {{Item.Start_Bid}}
        Time End : {{Item.Time_End}}
        Time Start : {{Item.Time_Start}}
        Owner : {{Item.U_ID}}
        <br>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
    export default {
        data(){
            return {
                imageData: [],
                type:"",
                Shirt:[],
                Pant:[],
                Shoes:[],
                Watch:[],
                Backpack: []
            }
        },
        
        created: function () {
    this.assignProduct()
  },
        methods:{
           time(EndDate){
               var now = new Date
      console.log(moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(EndDate,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"))

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
            assignProduct(){
               var ref = firebase.database().ref("Products/Shirt/");
                ref.orderByChild("Date_End").on("value",snapshot => {
                    this.Shirt = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Pant/");
                ref.orderByChild("Date_End").on("value",snapshot => {
                    this.Pant = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Shoes/");
                ref.orderByChild("Date_End").on("value",snapshot => {
                    this.Shoes = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Watch/");
                ref.orderByChild("Date_End").on("value",snapshot => {
                    this.Watch = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Backpack/");
                ref.orderByChild("Date_End").on("value",snapshot => {
                    this.Backpack = snapshot.val()
                })
            }
        
        }
}
</script>


<style scoped>
</style>