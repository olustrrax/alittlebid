<template>
  <div class="register">
      <div class="container">
        <div class="ui raised padded text container segment">
            <h2 class="ui orange ribbon label">
                ลงทะเบียน
            </h2>
        <p></p>
        <p></p>
        <h2>SignUp</h2>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-3"/>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">

            <input type="email" v-model="formData.email" class="form-control" placeholder="email">
            <br>
            <input type="password" v-model="formData.password" class="form-control" placeholder="password">
            <br>
            <button class="btn btn-success" @click="signUp">SignUp</button>
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
</script>

<style>
 /* .container{
    width: 70%;
    height: 70%;
 } */
</style>
