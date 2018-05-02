<template>
  <div id="app">
    <div class="ui orange inverted menu">
      <img src="./assets/logo2.png">
      <a class="active item">
        หน้าแรก
      </a>
      <div class="ui simple dropdown link item">
        <span class="text">สินค้า</span>
        <i class="dropdown icon"></i>
        <div class="menu">
          <div class="header">ประเภท</div>
          <div class="item">
            <i class="dropdown icon"></i>
            <span class="text">เสื้อผ้า</span>
            <div class="menu">
              <div class="item">เสื้อ</div>
              <div class="item">กางเกง</div>
              <div class="item">รองเท้า</div>
            </div>
          </div>
          <div class="item">
            <i class="dropdown icon"></i>
            <span class="text">เครื่องประดับ</span>
            <div class="menu">
              <div class="item">กระเป๋า</div>
              <div class="item">นาฬิกา</div>
            </div>
          </div>
        </div>
      </div>
      <a class="item">
        ลงประมูลสินค้า
      </a>
      <a class="item">
        สินค้าที่กำลังปิดประมูล
      </a>
      <div class="ui right simple dropdown link item">
        <i class="dropdown icon"></i>
        <span class="text" id="user">สินค้า</span>
        
        <div class="right menu">
          <div class="header">ประเภท</div>
          <div class="item">
            <i class="dropdown icon"></i>
            <span class="text">เสื้อผ้า</span>
            <div class="menu">
              <div class="item">เสื้อ</div>
              <div class="item">กางเกง</div>
              <div class="item">รองเท้า</div>
            </div>
          </div>
          <div class="item">
            <i class="dropdown icon"></i>
            <span class="text">เครื่องประดับ</span>
            <div class="menu">
              <div class="item">กระเป๋า</div>
              <div class="item">นาฬิกา</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
img{
  height: 50px;
}
#user{
  padding-left: 15px;
}

</style>
