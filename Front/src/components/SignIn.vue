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
                },
                userData:[],
                winProduct:[],
                productData:[],
            }
        },
        methods:{
            signIn(){
                firebase.auth().signInWithEmailAndPassword(this.formData.email,this.formData.password)
                    .then(user =>{
                        this.getUserData()
                        this.$router.replace('/main')
                    })
                    .catch(e=>{
                        alert("SignIn "+e)
                    })
            },
            register(){
                this.$router.replace('/register')
            },
            getUserData(){
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                .once("value",snapshot=>{
                    this.userData=[]
                    this.userData.push(snapshot.val())
                    console.log(this.userData)
                    this.getWinProduct()
                })
                .catch(e=>{
                    console.log(e)
                })
            },
            getWinProduct(){
                var keys =["Pant","Shirt","Backpack","Shoes","Watch"]
                keys.forEach(item => {
                    firebase.database().ref('Products/'+item).orderByChild('Max_Bidder').equalTo(firebase.auth().currentUser.uid)
                        .once("value",snapshot=>{
                            this.winProduct=[]
                            snapshot.forEach(element => {
                                console.log(element.key)
                                this.getProductData(item,element.key)
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                
            },
            updateHistory(pid){
                var total
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid).child('Bit_History')
                .child(pid).once("value",snapshot=>{
                    console.log(snapshot.val().status)
                    axios.get('http://localhost:8081/calculateBit/'+this.userData[0].Total_Bit+'/'+snapshot.val().status)
                    .then(res=>{
                        total=res.data.message
                        new Promise((resolve,reject)=>{
                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                            .update({
                                Total_Bit:total
                            })
                            .then(user => {
                                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                .child('Bit_History').child(pid).update({
                                    status:'completed'
                                })
                                .then(up=>{
                                    resolve()
                                })
                                .catch(errup=>{
                                    reject()
                                })
                                
                            })
                            .catch(err=>{
                                reject()
                            })
                        })
                        .then(resolve=>{
                            console.log('complete')
                        })
                        .catch(reject=>{
                            console.log('reject')
                            this.reverse()
                        })
                    })
                })  
            },
            getProductData(type,key){
                firebase.database().ref('Products').child(type).child(key)
                .once("value",snapshot=>{
                    axios.post('http://localhost:8081/productstatus',snapshot.val())
                    .then(res=>{
                        if(res.data.message=='end')
                        {
                            this.updateHistory(key)
                        }
                    })
                })
            },
            reverse(){
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid).set(this.userData[0])
                .then(res=>{
                    console.log('resever')
                })
                .catch(err=>{
                    console.log('error reverse')
                })
            }
        }
}
</script>


<style scoped>

</style>
