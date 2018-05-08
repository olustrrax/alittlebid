<template>
    <div class="row">
        <h2>Signin</h2>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-3"/>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">

            <input type="email" v-model="formData.email" class="form-control" placeholder="email">
            <br>
            <input type="password" v-model="formData.password" class="form-control" placeholder="password">
            <br>
            <button class="btn btn-success btn-block full-width" @click="signIn">Signin</button>
            <button class="btn btn-success btn-block full-width" @click="register">Register</button>

        </div>

    </div>
</template>

<script>
    import axios from 'axios' 
    export default {
        name: 'SignIn',
        data(){
            return {
                formData: {
                    email: '',
                    password: ''
                }
            }
        },
        methods:{
            signIn(){
                let User = {
                    Email:this.formData.email,
                    Password:this.formData.password
                }
                axios.post('http://localhost:8081/signin', User) 
                    .then((response) => { 
                        console.log(response)
                        if(response.data.status!='fail')
                        {
                            updateUserHistory()
                        } 
                    }) 
                    .catch((error) => { 
                        console.log(error) 
                    }) 
            },
            register(){
                this.$router.replace('/sentmail')
            },
            updateUserHistory(){
                axios.post('http://localhost:8081/user/'+firebase.auth().currentUser.uid)
                .then(res=>{
                    this.$router.replace('/main')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
}
</script>


<style scoped>

</style>
