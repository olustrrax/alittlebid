<template>
  <div class="register">
      <div class="container">
        <div class="ui raised padded text container segment">
            <h2 class="ui orange ribbon label">
                ลงทะเบียน
            </h2>
        <p></p>
        <p></p>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-3"/>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">

            <input type="email" v-model="formData.email" class="form-control" placeholder="email">
            <br>
            <input type="password" v-model="formData.password" class="form-control" placeholder="password">
            <br>
            <input type="password" v-model="formData.confirmPassword" class="form-control" placeholder="password">
            <br>
            <input type="text" v-model="formData.firstname" class="form-control" placeholder="firstname">
            <br>
            <input type="text" v-model="formData.lastname" class="form-control" placeholder="lastname">
            <br>
            <input type="text" v-model="formData.telephone" class="form-control" placeholder="08xxxxxxxx">
            <br>
            <input type="text" v-model="formData.account_no" class="form-control" placeholder="12345">
            <br>
            <input type="text" v-model="formData.displayname" class="form-control" placeholder="Displayname">
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
              confirmPassword:'',
              firstname:'',
              lastname:'',
              telephone:'',
              account_no:'',
              displayname:''
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
</script>

<style>
 /* .container{
    width: 70%;
    height: 70%;
 } */
</style>
