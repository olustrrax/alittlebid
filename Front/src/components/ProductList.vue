<template>
    <div class="row">
        <div v-for="Item in this.Product">
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
                Product: {
                    Name:"",
                    Bid_Increse:"",
                    Current_Price:"",
                    Date_End:"",
                    Date_Start:"",
                    Description:"",
                    Image:[],
                    Max_Bidder:"",
                    Start_Bid:"",
                    Time_End:"",
                    Time_Start:"",
                    U_ID:""
                    
                }
            }
        },
        created: function () {
    this.assignProduct("Pant")
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
            assignProduct(type){
                axios.get('http://localhost:8081/search/'+type)
                .then((response) => {
                    console.log(response.data)
                this.Product=response.data;
                })
                .catch((error) => {
                })
            }
        
        }
}
</script>


<style scoped>
</style>