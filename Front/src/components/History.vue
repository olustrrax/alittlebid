<template>
<div id="history">
    <div class="center">
        <div class="row">
        <div class="ui raised segment">
        <div class="ui orange ribbon label">
            <h2 id="head">
                รองเท้า
            </h2>
        </div>
        <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column" v-for="Item,key,index in this.Shoes" v-if="index < 3"> 
        <div class="ui centered card">
            <div class="ui tiny images">
              <img class="ui image" v-for="image in Item.Image" :src="image"></img>
            </div>

         <div class="content">
            <a class="ui header" id="head">{{Item.Name}}</a>
            <a v-if="Item.Status!='inprocess'"> {{ getUser(Item)}}</a>
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
            <a v-if="Item.Status != 'inprocess'" class="ui red label">จบการประมูล</a>
            <a v-if="Item.Status == 'inprocess'" class="ui green label" @click="BidThis('Shoes',key)">ยังไม่จบการประมูล</a>
          </div>
        </div>
      </div>
    </div> 
        </div>
        </div>
        
        <div class="row">
        <div class="ui raised segment">
        <div class="ui orange ribbon label">
            <h2 id="head">
                นาฬิกา
            </h2>
        </div>
        <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column" v-for="Item,key,index in this.Watch" v-if="index < 3"> 
        <div class="ui centered card">
            <div class="ui tiny images">
              <img class="ui image" v-for="image in Item.Image" :src="image"></img>
            </div>

          <div class="content">
            <a class="ui header" id="head">{{Item.Name}}</a>
            <a v-if="Item.Status!='inprocess'"> {{ getUser(Item)}}</a>

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
            <a v-if="Item.Status != 'inprocess'" class="ui red label">จบการประมูล</a>
            <a v-if="Item.Status == 'inprocess'" class="ui green label" @click="BidThis('Watch',key)">ยังไม่จบการประมูล</a>
          </div>
        </div>
      </div>
    </div> 
        </div>
        </div>
        
        <div class="row">
        <div class="ui raised segment">
        <div class="ui orange ribbon label">
            <h2 id="head">
                กระเป๋า
            </h2>
        </div>
        <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column" v-for="Item,key,index in this.Backpack" v-if="index < 3"> 
        <div class="ui centered card">
            <div class="ui tiny images">
              <img class="ui image" v-for="image in Item.Image" :src="image"></img>
            </div>

          <div class="content">
            <a class="ui header" id="head">{{Item.Name}}</a>
            <a v-if="Item.Status!='inprocess'"> {{ getUser(Item)}}</a>

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
            <a v-if="Item.Status != 'inprocess'" class="ui red label">จบการประมูล</a>
            <a v-if="Item.Status == 'inprocess'" class="ui green label" @click="BidThis('Backpack',key)">ยังไม่จบการประมูล</a>
          </div>
        </div>
      </div>
    </div> 
        </div>
        </div>
        <div class="row">
        <div class="ui raised segment">
        <div class="ui orange ribbon label">
            <h2 id="head">
                เสื้อ
            </h2>
        </div>
        <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column" v-for="Item,key,index in this.Shirt" v-if="index < 3"> 
        <div class="ui centered card">
            <div class="ui tiny images">
              <img class="ui image" v-for="image in Item.Image" :src="image"></img>
            </div>

          <div class="content">
            <a class="ui header" id="head">{{Item.Name}}</a>
            <a v-if="Item.Status!='inprocess'"> {{ getUser(Item)}}</a>

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
            <a v-if="Item.Status != 'inprocess'" class="ui red label">จบการประมูล</a>
            <a v-if="Item.Status == 'inprocess'" class="ui green label" @click="BidThis('Shirt',key)">ยังไม่จบการประมูล</a>
          </div>
        </div>
      </div>
    </div> 
        </div>
        </div>
        <div class="row">
        <div class="ui raised segment">
        <div class="ui orange ribbon label">
            <h2 id="head">
                กางเกง
            </h2>
        </div>
        <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column" v-for="Item,key,index in this.Pant" v-if="index < 3"> 

        <div class="ui centered card">
            <div class="ui tiny images">
              <img class="ui image" v-for="image in Item.Image" :src="image"></img>
            </div>

          <div class="content">
            <a class="ui header" id="head">{{Item.Name}}</a>
                        <a v-if="Item.Status!='inprocess'"> {{ getUser(Item)}}</a>

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
            <div v-if="Item.Status != 'inprocess'" class="ui red label">จบการประมูล</div>
            <div v-if="Item.Status == 'inprocess'" class="ui green label" @click="BidThis('Pant',key)">ยังไม่จบการประมูล</div>
          </div>
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
        data(){
            return {
                imageData: [],
                type:"",
                msg:"",
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
        test(){
          return "yay"
        },
        getUser(key){
          if(key.Max_Bidder != "NULL")
          {
          var x = ""
            firebase.database().ref('Users').child(key.Max_Bidder)
            .once("value",snapshot=>{
              x =  snapshot.val().Firstname+" "+snapshot.val().Lastname
              key.Max_Bidder = "ผู้ชนะประมูล "+ x
            })
            
          }
          else
          {
            key.Max_Bidder = "ไม่มีผู้ประมูล"
          }
          return key.Max_Bidder
        },
            assignProduct(){
               var ref = firebase.database().ref("Products/Shirt/");
                ref.orderByChild("U_ID").equalTo(firebase.auth().currentUser.uid).on("value",snapshot => {
                    this.Shirt = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Pant/");
                ref.orderByChild("U_ID").equalTo(firebase.auth().currentUser.uid).on("value",snapshot => {
                    this.Pant = snapshot.val()
                    
                })
                var ref = firebase.database().ref("Products/Shoes/");
                ref.orderByChild("U_ID").equalTo(firebase.auth().currentUser.uid).on("value",snapshot => {
                    this.Shoes = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Watch/");
                ref.orderByChild("U_ID").equalTo(firebase.auth().currentUser.uid).on("value",snapshot => {
                    this.Watch = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Backpack/");
                ref.orderByChild("U_ID").equalTo(firebase.auth().currentUser.uid).on("value",snapshot => {
                    this.Backpack = snapshot.val()
                })
            },
    BidThis(itype,iid){
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
#History{
    background-color: black;
}
.center {
    margin: auto;
    width: 80%;
    padding: 10px;
    border-color: darkgrey;
    
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
</style>