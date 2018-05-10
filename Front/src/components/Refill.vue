<template>
    <div>
        <input type="text" v-model="formData.fill">
        <button @click="refill">Refill</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            formData:{
                fill:''
            },
            userData:[]
        }
    },
    methods:{
        refill(){
            axios.get('http://localhost:8081/refill/'+this.userData[0].Current_Bit+'/'+this.userData[0].Total_Bit+'/'+this.formData.refill)
            .then(res=>{
                if(res.data.status=='success')
                {
                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                    .update({
                        Current_Bit:res.data.current_bit,
                        Total_Bit:res.data.total_bit
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
            
        }
    },
    created(){
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
        .once("value",snapshot=>{
            this.userData = []
            this.userData.push(snapshot.val())
        })
    }
}
</script>

<style>

</style>
