<template>
  <div>
    <input type="email" v-model="formData.email" class="form-control" placeholder="email">
    <br>
    <button class="btn btn-success" @click="sentToMail">verify</button>
  </div>
</template>

<script>
export default {
  name: "sentmail",
  data(){
      return{
          formData:{
              email: '',
          }
      }
  },
  methods:{
  sentToMail(){
            var actionCodeSettings = {
            url: 'http://localhost:8080/#/register',
            handleCodeInApp: true,
            };
            firebase.auth().sendSignInLinkToEmail(this.formData.email, actionCodeSettings)
            .then( res =>{
                window.localStorage.setItem('emailForSignIn', this.formData.email);

            })
            .catch(function(error) {
                console.log(error)
            });
      }
  }
}
</script>

<style>

</style>

