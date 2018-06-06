<template>
  <div class="main">
<div class="ui segment">
  <div class="ui inverted segment">
    <div class="ui left huge header" id="head">
        กระเป๋า
          <router-link to="/Product/Backpack"  >
            <button class="small ui right floated basic inverted button" id="head">
              <i class="left chevron icon"></i>
                ดูทั้งหมด
            </button>  
          </router-link>
    </div>
    <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column" v-for="Item,key,index in this.Backpack" v-if="index < 3"> 
        <div class="ui centered card"  style="border-radius: 25px;" >
        <!--<div class="image-preview" v-for="image in Item.Image">-->
        <!--        <img class="preview" :src="image">-->
        <!--    </div>-->
        <div class="ui tiny images" style="border-radius: 25px;">
          <!--<button class="w3-button w3-display-left" onclick="plusDivs(-1)">&#10094;</button>-->

          <img class="mySlides" v-for="image in Item.Image" style="border-radius: 25px;" :src="image"></img>
          <!--<button class="w3-button w3-display-right" onclick="plusDivs(+1)">&#10095;</button>-->
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
            <button class="ui right floated inverted orange button" @click="BidThis('Backpack',key)">BID</button>
          </div>
        </div>
      </div>

    </div>   
  </div>
  <div class="ui inverted divider"></div>
  <div class="ui inverted segment">
    <div class="ui left huge header" id="head">
        นาฬิกา
          <router-link to="/Product/Watch"  >
            <button class="small ui right floated basic inverted button" id="head">
              <i class="left chevron icon"></i>
                ดูทั้งหมด
            </button>  
          </router-link>
    </div>
    <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column" v-for="Item,key,index in this.Watch" v-if="index < 3"> 
        <div class="ui centered card">
            <!--     <div class="image-preview" v-for="image in Item.Image">-->
            <!--    <img class="preview" :src="image">-->
            <!--</div>-->
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
            <button class="ui right floated inverted orange button" @click="BidThis('Watch',key)">BID</button>
          </div>
        </div>
      </div>
    </div>   
  </div>

  <div class="ui inverted divider"></div>
  <div class="ui inverted segment">
    <div class="ui left huge header" id="head">
        รองเท้า
          <router-link to="/Product/Shoes"  >
            <button class="small ui right floated basic inverted button" id="head">
              <i class="left chevron icon"></i>
                ดูทั้งหมด
            </button>    
          </router-link>
    </div>
    <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column" v-for="Item,key,index in this.Shoes" v-if="index < 3"> 
        <div class="ui centered card">
        <!--          <div class="image-preview" v-for="image in Item.Image">-->
        <!--        <img class="preview" :src="image">-->
        <!--    </div>-->
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
            <button class="ui right floated inverted orange button" @click="BidThis('Shoes',key)">BID</button>
          </div>
        </div>
      </div>
    </div>   
  </div>

  <div class="ui inverted divider"></div>
  <div class="ui inverted segment">
    <div class="ui left huge header" id="head">
        เสื้อ
          <router-link to="/Product/Shirt"  >
            <button class="small ui right floated basic inverted button" id="head">
              <i class="left chevron icon"></i>
                ดูทั้งหมด
            </button>   
          </router-link>  
    </div>
    <div class="ui inverted divider"></div>
    <div class="ui three column grid">
  
      <div class="column"  v-for="Item,key,index in this.Shirt" v-if="index < 3"> 
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
            <button class="ui right floated inverted orange button" @click="BidThis('Shirt',key)">BID</button>
          </div>
        </div>
      </div>

    </div>   
  </div>

  <div class="ui inverted divider"></div>
  <div class="ui inverted segment">
    <div class="ui left huge header" id="head">
        กางเกง
        <router-link to="/Product/Pant"  >
          <button class="small ui right floated basic inverted button" id="head">
            <i class="left chevron icon"></i>
              ดูทั้งหมด
          </button>  
        </router-link>  
    </div>
    <div class="ui inverted divider"></div>
    <div class="ui three column grid">
      <div class="column"  v-for="Item,key,index in this.Pant" v-if="index < 3"> 
        <div class="ui centered card">
          <!--<div class="image-preview" v-for="image in Item.Image">-->
          <!--      <img class="preview" :src="image">-->
          <!--  </div>-->
          <div class="ui tiny images">
            <img class="ui image" v-for="image in Item.Image" :src="image"></img>
          </div>
          <div class="content">
            <a class="ui header" id="head">{{Item.Name}}!</a>
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
            <button class="ui right floated inverted orange button" @click="BidThis('Pant',key)">BID</button>
          </div>
        </div>
      </div>

    </div>   
  </div>
  <p></p>
  
</div>

  

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
    export default {
        data(){
            return {
              datenow: '',
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
  /*mounted:function(){
    this.time()
  },*/
        methods:{
          /* time(){
            var self = this
var now  = "11/5/2018 15:00:00";
var then = moment(new Date,"DD/MM/YYYY HH:mm:ss");

var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
var d = moment.duration(ms);
var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

      this.datenow = s
      setInterval(self.time, 1000)
    },*/
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
                ref.orderByChild("Date_End").limitToFirst(3).on("value",snapshot => {
                    this.Shirt = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Pant/");
                ref.orderByChild("Date_End").limitToFirst(3).on("value",snapshot => {
                    this.Pant = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Shoes/");
                ref.orderByChild("Date_End").limitToFirst(3).on("value",snapshot => {
                    this.Shoes = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Watch/");
                ref.orderByChild("Date_End").limitToFirst(3).on("value",snapshot => {
                    this.Watch = snapshot.val()
                })
                var ref = firebase.database().ref("Products/Backpack/");
                ref.orderByChild("Date_End").limitToFirst(3).on("value",snapshot => {
                    this.Backpack = snapshot.val()
                })
            },
        signOut(){
           firebase.auth().signOut()
            .then(()=>{
              // this.$router.replace('/signin')
            })
            .catch((e)=>{
              alert(e.message)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Kanit:300|Open+Sans:300,400&subset=latin-ext,thai');
.header{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: black;
}
ui {
  border-radius: 25px;
}
#meta{
  color: black;
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
</style>
