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
                        <input type="text" v-model="formData.firstname" placeholder="นาย แดเนียล">
                    </div>
                    <div class="field">
                        <div class="ui teal horizontal label">นามสกุล</div>
                        <input type="text" v-model="formData.lastname" placeholder="ศรีจุลโพธิ์">
                    </div>
                </div>
                <div class="field">
                  <div class="ui teal horizontal label">รูปประจำตัว</div>
                  <input type="text" v-model="formData.displayname" class="form-control" placeholder="Displayname">
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
                    <input type="text" v-model="formData.telephone" placeholder="08xxxxxxxx">
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
                    <textarea rows="2" v-model="formData.address" placeholder="11/11 หมู่บ้าน รักดี ต.บางบัวทอง อ.บางบัวทอง จ.นนทบุรี 11110"></textarea>
                </div>
                <div class="ten wide field">
                   <div class="ui teal horizontal label">อีเมล</div>
                   <input type="email" v-model="formData.email" class="form-control" placeholder="email">
                </div>
                <div class="ten wide field">
                   <div class="ui teal horizontal label">รหัสผ่าน</div>
                   <input type="password"  v-model="formData.password" class="form-control" placeholder="password">
            
                </div>
                <div class="ten wide field">
                  <div class="ui teal horizontal label">กรอกรหัสผ่านอีกครั้ง</div>
                  <input type="password" v-model="formData.confirmPassword" class="form-control" placeholder="password">
                </div>
                <br><br><br>
                <div class="ui submit button" @click="signUp">สมัครสมาชิก</div>
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
              confirmPassword:'',
              firstname:'',
              lastname:'',
              telephone:'',
              account_no:'',
              displayname:'',
              address:''
              
          },
          message:'',
      }
  },
  created(){
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
        this.$router.replace('/signin')
    }
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        window.localStorage.removeItem('emailForSignIn');
        var user = firebase.auth().currentUser
        user.delete()
              .then( res =>{

              })
              .catch ( err => {
                  console.log(err)
              })

      })
      .catch(function(error) {
        console.log('auth with mail linke '+error)
      });
    }
    else{                    
        this.$router.replace('/signin')

    }

  },
  methods:{
      signUp(){
        if(this.formData.password.match(this.formData.confirmPassword))
        {
            firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password)
            .then( user=> {
                this.addUser(user.uid)
            })
            .catch( e =>{
                console.log("create :"+ e)
                alert(e.message)
            }) 
        }
        else{
            this.message='password not match'
            console.log('password not match')
        }
        
      },
      addUser(uid){          
          firebase.database().ref("Users").child(uid).set({
              Account_No:this.formData.account_no,
              Current_Bit:"0",
              Email:this.formData.email,
              Firstname:this.formData.firstname,
              Lastname:this.formData.lastname,
              Image:"null",
              Password:this.formData.password,
              Tel:this.formData.telephone,
              Total_Bit:"0",
              Username:this.formData.displayname
          })
          .then( res =>{
            //   console.log(res)
            this.$router.replace('/signin')


          })
          .catch( error => {
              var user = firebase.auth().currentUser;
              user.delete()
              .then( res =>{

              })
              .catch ( err => {
                  console.log(err)
              })
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
