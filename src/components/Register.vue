<template>
<div class="register">
<div class="center">
    <div class="row">
    <div class="ui raised segment">
        <div class="ui orange ribbon label">
            <h2 >
                ลงทะเบียน
            </h2>
        </div>
    
        <br><br><br>
        <div class="row">
            <div class="ui small form error">
                <div class="two fields">
                    <div class="field">
                        <div class="ui teal horizontal label">ชื่อจริง</div>
                        <input placeholder="นาย แดเนียล" type="text">
                    </div>
                    <div class="field">
                        <div class="ui teal horizontal label">นามสกุล</div>
                        <input placeholder="ศรีจุลโพธิ์" type="text">
                    </div>
                </div>
                <div class="ui teal horizontal label">บัตรประจำตัวประชาชน</div>
                <div class="inline fields">
                <div class="six wide field">
                    <input placeholder="1111111111" type="text">
                </div>
                </div>
                <div class="ui teal horizontal label">เบอร์โทรศัพท์</div>
                <div class="inline fields">
                <div class="six wide field">
                    <input placeholder="เบอร์โทรศัพท์" type="text">
                </div>
                </div>
                <div class="ui teal horizontal label" for="gender">เพศ</div>     
                <div class="inline fields">
                    <div class="field">
                        <select>
                            <option value="1">ชาย</option>
                            <option value="0">หญิง</option>
                            <option value="0">อื่นๆ</option>
                        </select>
                        
                    </div>
                </div>

                <div class="field">
                    <div class="ui teal horizontal label">ที่อยู่ปัจจุบัน</div>
                    <textarea rows="2" placeholder="11/11 หมู่บ้าน รักดี ต.บางบัวทอง อ.บางบัวทอง จ.นนทบุรี 11110"></textarea>
                </div>
                <div class="ten wide field">
                    <div class="ui teal horizontal label">อีเมล</div>
                   <input type="email" v-model="formData.email" class="form-control" placeholder="email">
                </div>
                <div class="ten wide field">
                    <div class="ui teal horizontal label">รหัสผ่าน</div>
                   <input type="password" v-model="formData.password" class="form-control" placeholder="password">
            
                </div>
                <br><br><br>
                <div class="ui submit button" @click="signUp">สมัคร</div>
            </div>
        </div>
        
    </div>

    </div>
</div> 
</div>
</template>

<script>
export default {
  name: "register",
  data(){
      return{
          formData:{
              email: '',
              password: '',
          }
      }
  },
  methods:{
      signUp(){
          var thisfunc = this
        firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password)
            .then( user=> {
                thisfunc.$router.replace('/main')
            })
            .catch( e =>{
                alert(e.message)
            })
      }
  }
}

// $('.ui.radio.checkbox')
//   .checkbox();
</script>


</style>

<style>
/* @import url('./jquery.Thailand.js/dist/jquery.Thailand.min.css'); */
.center {
    margin: auto;
    width: 50%;
    padding: 10px;
    border-color: darkgrey;
}
</style>
