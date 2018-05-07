<template>
    <div class="row">
        <div v-for="Item in this.Product.Pant">
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
    export default {
        data(){
            return {
                imageData: [],
                type:"",
                Product: []
            }
        },
        created: function () {
    this.assignProduct()
  },
        methods:{
           
            previewImage: function(event) {
            this.Product.Image=[];
            var input = event.target;
            for(let i = 0;i<input.files.length;i++)
            {
                if (input.files && input.files[i]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.Product.Image.push(e.target.result);
                }
                reader.readAsDataURL(input.files[i]);
            }
            }
            
        },
            assignProduct(){
                var ref = firebase.database().ref("Products");
                var Pro = this.Product
                ref.on("value",snapshot => {
                    this.Product = snapshot.val()
                    console.log(this.Product)
                    console.log(this.Product.Pant)
                })
            }
        
        }
}
</script>


<style scoped>
</style>