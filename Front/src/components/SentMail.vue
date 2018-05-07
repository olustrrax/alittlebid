<template>
  <div>
    <input type="email" v-model="formData.email" class="form-control" placeholder="email">
    <br>
    <button class="btn btn-success" @click="sentToMail">verify</button>
  </div>
</template>

<script>
import axios from 'axios' 
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
        let User={
            Email:this.formData.email
        }
        axios.post('http://localhost:8081/mailverify',User)
        .then((response)=>{
            console.log('mail send')
            console.log(response.data.message)
            if(response.data.message=='success')
            {
                alert("Please check your Email")
            }
        })
        .catch((error)=>{
        })
      }
  }
}
</script>

<style>

</style>

