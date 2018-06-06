<template>
    <div class="row">
        <div id="sendm" align="center">
            <div class="ui message" id="login-window">
                <div class="ui red inverted segment" id="login-window2" >
                    <div class="ui large header" id="head">
                        เข้าสู่ระบบ
                    </div>   
                </div>  
                <br>
                <div class="ui grid">
                    <div class="row">
                        <div class="four wide column">
                            <div class="header" id="hemail">
                                อีเมลผู้ใช้    :
                            </div>
                        </div>
                        <div class="twelve wide column">
                            <div class="ui input" id="em">
                                <input type="email" v-model="formData.email" class="form-control" placeholder="E-mail">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="four wide column">
                            <div class="header" id="hemail">
                                รหัสผ่าน :
                            </div>
                        </div>
                        <div class="twelve wide column">
                            <div class="ui input" id="em">
                                <input type="password" v-model="formData.password" class="form-control" placeholder="Password">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="eight wide column">
                            <button class="big ui red button" id="sub" @click="signIn">เข้าสู่ระบบ</button>
                        </div>
                        <div class="eight wide column">
                            <button class="big ui red basic button" id="sub" @click="register">สมัครสมาชิก</button>
                        </div>
                    </div>
                </div>    
            </div>      
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
                soldProduct:[],
            }
        },
        methods:{
            signIn(){
                firebase.auth().signInWithEmailAndPassword(this.formData.email,this.formData.password)
                    .then(user =>{
                        this.getUserData()
                        swal({
                            title: "เข้าสู่ระบบสำเร็จ!",
                            icon: "success",
                            button: "Close",
                        });
                        this.$router.replace('/main')
                    })
                    .catch(e=>{
                        swal({
                            title: "ลองใหม่อีกครั้ง!",
                            icon: "warning",
                            dangerMode: true,
                            button: "Close",
                        });
                        swal.stopLoading();
                        swal.close();
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
                    this.getWinProduct()
                    this.getEndProduct()

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
                                this.getProductData(item,element.key,1)
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                
            },
            getEndProduct(){
                var keys=["Pant","Shirt","Backpack","Shoes","Watch"]
                keys.forEach(item=>{
                    firebase.database().ref('Products/'+item).orderByChild("U_ID").equalTo(firebase.auth().currentUser.uid)
                    .once("value",snapshot=>{
                        this.soldProduct=[]
                        snapshot.forEach(element=>{
                            console.log(element.val())
                            console.log("item "+item)
                            console.log("elementkey "+element.key)
                            firebase.database().ref('Products/'+item+'/'+element.key)
                            .once("value",psnapshot=>{
                                console.log(psnapshot.val())
                                console.log("snapshot : "+psnapshot.key+" "+psnapshot.val().Status)
                                if(psnapshot.val().Status=="out")
                                {
                                    console.log('this is out')
                                }
                                else if(psnapshot.val().Status=="end")
                                {
                                    this.getProductData(item,psnapshot.key,2)
                                }
                                else{
                                    console.log("getEndProduct : "+item,psnapshot.key)
                                   
                                }
                                

                            })
                        })
                    })
                    .catch(err=>{
                        console.log('endproduct '+err)
                    })
                })
            }
            ,
            updateHistory(pid){
                var total
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid).child('Bit_History')
                .child(pid).once("value",snapshot=>{
                    axios.get('http://alittlebid-mangese.c9users.io:8081/calculateBit/'+this.userData[0].Total_Bit+'/'+snapshot.val().status)
                    .then(res=>{
                        total=res.data.message
    
                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                        .update({
                            Total_Bit:total
                        })
                        .then(user => {
                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                            .child('Bit_History').child(pid).update({
                                status:'completed'
                            })
                        })
                    })
                })  
            },
            getProductData(type,key,mode){
                firebase.database().ref('Products').child(type).child(key)
                .once("value",snapshot=>{
                    axios.post('http://alittlebid-mangese.c9users.io:8081/productstatus',snapshot.val())
                    .then(res=>{
                        if(res.data.message=='end' && mode==1)
                        {
                            this.updateHistory(key)
                        }
                        else if(res.data.message=='end' && mode==2){
                            this.getBitFromProduct(snapshot.val().Current_Price,type,key)
                        }
                    })
                })
            },
            getBitFromProduct(total,type,key){
                axios.get('http://alittlebid-mangese.c9users.io:8081/refill/'+this.userData[0].Current_Bit+'/'+this.userData[0].Total_Bit+'/'+total)
                .then(res=>{
                    if(res.data.status=='success')
                    {
                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                        .update({
                            Current_Bit:res.data.current_bit,
                            Total_Bit:res.data.total_bit
                        })
                        .then(res=>{
                            console.log("out")
                            firebase.database().ref('Products').child(type).child(key)
                            .update({
                                Status:"out"
                            })
                        })
                    }
                })
                
            }
        }
}
</script>


<style scoped>
.ui.message {
    padding-top: 100px;
    width: 60%;
    align-items: center;
    margin: center;
}
#sendm{
    text-align: center;
    align-items: center;
    align: center;
}
#hemail{
    margin: 9px auto;
    text-align: right;
    font-family: 'Kanit', 'Open Sans',sans-serif;
}
span{
    font-weight: bold;
    /* margin: 1em auto; */
    text-align: right;
    
}
#login-window{
    border: 2px solid #a83e3e;
    width:  60%;
    /* height: 275px; */
	margin: 5em auto;
	padding: 1em 1em 0em 1em;
    text-align: center;
    /* padding-top: 50px; */
	background: #ffffff;
	box-shadow: rgba(255, 63, 0, 0.329) 0px 1px 1px 0px,rgba(255, 0, 12, 0.658) 0px 2px 5px 2px;
}
label {
    padding-top: 10px;
    float: left;
}
.row{
    width: auto;
    /* margin: 10px auto; */
}
.ui.segment{
    align-self: center;
    width: 60%;
    align: center;
}
#em{
    width: 90%;
    /* margin-bottom: 2em auto; */
    align-self: center;
}

#login-window2{
    border: 1px solid ##fc0000;
    border-top-color: #000000;
    box-shadow: 0px 0px 1px #888,rgba(0,0,0,0.09804) 0px 1px 5px 1px;
    border-radius: 5;
    width: 100%;
    /* margin: 1em auto; */
}
#sub{
    width: 60%;
    font-family: 'Kanit', 'Open Sans',sans-serif;
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
</style>
