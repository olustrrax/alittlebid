<template>
    <div class="row">
        <input type="text" v-model = "Product.Name" placeholder="Product Name"/>
        <br>
        <input type="text" v-model = "Product.Description" placeholder="Description"/>
        <br>Start Date
        <input type="date" v-model = "Product.Date_Start">
        <input type="time" v-model = "Product.Time_Start">
        <br>End Date
        <input type="date" v-model = "Product.Date_End">
        <input type="time" v-model = "Product.Time_End">
        <br>
        <input type="text" placeholder="Start Bid" v-model = "Product.Start_Bid">
        <br>
        <input type="text" placeholder="Bid Increse" v-model = "Product.Bid_Increse">
        <br>
        <input type="file" @change="previewImage" accept="image/*" multiple>
        <br>
        <div class="image-preview" v-for="image in this.Product.Image">
                <img class="preview" :src="image">
            </div>
            <br>
        <input type="radio" v-model = "type" value="Shirt"> Shirt<br>
  <input type="radio" v-model = "type" value="Pant"> Pant
  <input type="radio" v-model = "type" value="Shoes"> Shoes
  <input type="radio" v-model = "type" value="Watch"> Watch
  <input type="radio" v-model = "type" value="Backpack"> Backpack
    {{type}}
    <br>
    <button type = "button" v-on:click="assignProduct"> Submit </button>
    </div>
</template>

<script>
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
                this.Product.Current_Price = 0
                this.Product.Max_Bidder = "NULL"
                this.Product.U_ID = "NULL"
                console.log(this.Product)
                var Productref = firebase.database().ref("Products/"+this.type);
                Productref.push(this.Product)
                // console.log(this.Product)
            }
        
        }
}
</script>


<style scoped>

</style>
