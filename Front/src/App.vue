<template>
  <div id="app">
    <div class="ui inverted menu">
      <img src="./assets/logo2.png">
      <div class="ui item active">
        <router-link to="/main">หน้าหลัก</router-link>
      </div>
      <div class="ui simple dropdown link item">
        <span class="text">สินค้า</span>
        <i class="dropdown icon"></i>
        <div class="menu">
          <div class="header">ประเภท</div>
          <div class="item">
            <i class="dropdown icon"></i>
            <span class="text">เสื้อผ้า</span>
            <div class="menu">
                
              <router-link class="link item" to="/Product/Shirt" >เสื้อ</router-link>
              <router-link class="link item" to="/Product/Pant">กางเกง</router-link>
              <router-link class="link item" to="/Product/Shoes">รองเท้า</router-link>
            </div>
          </div>
          <div class="item">
            <i class="dropdown icon"></i>
            <span class="text">เครื่องประดับ</span>
            <div class="menu">
               <router-link class="link item" to="/Product/Backpack">กระเป๋า</router-link>
               <router-link class="link item" to="/Product/Watch">นาฬิกา</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="ui item" v-if="status == 1">
        <router-link to="/product">ลงประมูลสินค้า</router-link>
      </div>
      <div class="ui item" v-if="status == 1">
        <router-link to="/history">ประวัติการขาย</router-link>
      </div>
      <a class="item" v-if="status == 1">
        <router-link to="/refill"  >
          <i class="money bill alternate outline"></i>
            เติม BID
        </router-link>
      </a>
      <div class="right menu">
        <a class="ui right item" v-if="status == 0">
          <router-link to="/signin"  >
          <i class="sign in alternate icon"></i>
            เข้าสู่ระบบ     
          </router-link>
        </a>
        <a class="ui right item" v-if="status == 0">
          <router-link to="/register" >
          <i class="plus square alternate icon"></i>
            สมัครสมาชิก
          </router-link>
        </a>
      
        <div class="ui right item" v-if="status == 1" >
          <router-link class="circular ui icon button" to="/edituser" >
            <i class="user icon"></i>
          </router-link>
        </div>
        <div class="ui right item" v-if="status == 1" >
          <div class="ui orange button" @click="signOut" id="head">
            <i class="sign out alternate icon"></i>
              ออกจากระบบ
          </div>
        </div>
      </div>
    </div>
    <router-view :key="$route.fullPath"></router-view>
    <br><br><br>
    <div class="ui black inverted vertical footer segment">
      <div class="ui center aligned container">
        <div class="ui stackable inverted grid">
          <div class="three wide column">
            <router-link class="link item" to="/">  <a class="ui inverted header" href="#" id="head">หน้าแรก</a> </router-link>
          </div>
          <div class="three wide column">
            <h4 class="ui inverted header" id="head">ประเภทสินค้า</h4>
            <div class="ui inverted link list">
              <router-link class="link item" to="/Product/Shirt"> <a class="item" href="#">เสื้อผ้า</a> </router-link>
             <router-link class="link item" to="/Product/Pant">   <a class="item" href="#">กางเกง</a> </router-link>
              <router-link class="link item" to="/Product/Shoes">  <a class="item" href="#">รองเท้า</a> </router-link>
              <router-link class="link item" to="/Product/Watch">  <a class="item" href="#">นาฬิกา</a> </router-link>
              <router-link class="link item" to="/Product/Backpack">  <a class="item" href="#">กระเป๋า</a> </router-link>
            </div>
          </div>
          <div class="seven wide right floated column"> 
            <h4 class="ui inverted orange header">A little BID</h4>
              <div class="ui inverted link list">
                <div class="item">
                  <i class="address card icon"></i>
                  ที่อยู่ : 304-305 ชั้น 3 EGCO ต.ศาลายา จ.นครปฐม 73170 
                </div>
                <div class="item">
                  <i class="phone icon"></i>
                  เบอร์โทรศัพท์ : 02-9837662
                </div>
                <div class="item">
                  <i class="envelope outline icon"></i>
                  E-mail: admin@alittlebid.com
                </div>
              </div>
          </div>
        </div>
        <div class="ui inverted section divider"></div>
        <div class="ui hirizintal inverted small divide link list">
          <img  src="./assets/logo2.png">
          <a class="item" href="#">Free & Open Source ::after</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      status: 0
    } 
  },
  created(){
    if(firebase.auth().currentUser){
      this.status = 1
    }
    else{
      this.status = 0
    }
    
  }, 
  methods:{
    signOut(){
      firebase.auth().signOut()
        .then(()=>{
          this.$router.replace('/main')
        })
        .catch((e)=>{
          alert(e.message)
        })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Kanit:300|Open+Sans:300,400&subset=latin-ext,thai');
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  

  font-family: 'Kanit', 'Open Sans',sans-serif;
  /*font-family: 'Open Sans', sans-serif;*/


}
.button{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
.item{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
.header{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
img{
  height: 50px;
}
#user{
  padding-left: 15px;
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}

</style>
