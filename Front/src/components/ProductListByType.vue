o-o<template>
    <div class=Type>
        <div class="ui inverted divider"></div>
  <div class="ui inverted segment">
    <div class="ui left huge header" id="head">
        {{msg}}
    </div>
    <div class="ui inverted divider"></div>
    <div class="ui three column centered grid">
  
      <div class="column"  v-for="Item,key,index in this.Product"> 
        <div class="ui centered card">
          <!--<div class="image-preview" v-for="image in Item.Image">-->
          <!--      <img class="preview" :src="image">-->
          <!--  </div>-->
        <div class="ui tiny images">
          <img class="ui image" v-for="image in Item.Image" :src="image"></img>
        </div>
          <div class="content">
            <a class="ui header" id="head">{{Item.Name}}</a>
            <div class="ui two column grid">
              <div class="row">
                <div class="column">
                  <div class="ui meta" id="meta">
                    <span>วันปิดประมูล</span>
                  </div>
                </div>
                <div class="column">
                  <div class="ui right floated meta" id="meta">
                    <span>เวลาปิดประมูล</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <h3 class="ui red Large header">
                    {{Item.Date_End}}
                  </h3>
                </div>
                <div class="column">
                  <h3 class="ui right aligned red Large header">
                     {{Item.Time_End}}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="extra content">
            <div class="ui labeled button">
              <div class="ui orange button">
                <i class="bitcoin icon"></i>
              </div>
              <div class="ui basic orange left pointing label">
                 {{Item.Current_Price}}
              </div>
            </div>
            <button class="ui right floated inverted orange button" @click="BidThis(Type,key)">BID</button>
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
        props:['Type'],
        data(){
            return {
              msg:"",
                imageData: [],
                type:"",
                Product:[]
            }
        },
        mounted:function() {
            // location.reload()
            // console.log(this.Type+'repeetttt')
            // this.Product = []
            // var ref = firebase.database().ref("Products/"+this.Type);
            // ref.on("value",snapshot => {
            //     this.Product = snapshot.val()
            //     console.log(this.Product)
                    
            // })
            console.log("test")
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
               console.log(this.Type)
               if(this.Type == "Shirt")
               {
                 this.msg = "เสื้อ"
               }else if(this.Type == "Pant")
               {
                 this.msg = "กางเกง"
               }
               else if(this.Type == "Shoes")
               {
                 this.msg = "รองเท้า"
               }
               else if(this.Type == "Watch")
               {
                 this.msg = "นาฬืกา"
               }
               else 
               {
                 this.msg = "กระเป๋า"
               }
               var ref = firebase.database().ref("Products/"+this.Type);
            /*    var today = new Date
                var fullday = (parseInt(today.getMonth())+1)+'/'+today.getDate()+'/'+today.getFullYear()
                console.log(fullday)
                ref.orderByChild("Date").on("value",snapshot => {
                    console.log(snapshot.val()) 
                    snapshot.forEach(function(element) {
               
               if(moment(element.val().Date, 'MM-DD-YYYY').format('MM/DD/YYYY') < moment(fullday, 'MM-DD-YYYY').format('MM/DD/YYYY'))
               {
                    console.log("No" + "   " + element.val().Date)
               }
               else
               {
                   console.log("Pass" + "   " + element.val().Date)

               }

});
                })
                */
                ref.on("value",snapshot => {
                    this.Product = snapshot.val()
                    console.log(this.Product)
                    
                })
            }, BidThis(itype,iid){
      var obj={
        type:itype,
        id:iid
      }
      this.$router.push({name:'Bid',params:{items:obj}})
    }
        
        }
}
</script>


<style scoped>
#meta{
  color: black;
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
</style>