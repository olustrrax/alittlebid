<template>
    <div class="refill">
        <div id="sendm" align="center">
            <div class="ui message" id="login-window">
                <div class="ui inverted segment" id="login-window2" >
                    <div class="ui orange large header" id="head">
                        ระบบเติม BID
                    </div>   
                </div>  
                <!--<div class="">-->
                <!--    <div class="big ui orange tag label" id="uname">ชื่อผู้ใช้</div>-->
                <!--</div>-->
                <br><br><br><br>
                <div class="ui column grid">
                  <div class="column">
                    <div class="ui segment">
                      <p>ระบบ BID คือการแทนค่าเงินจริงให้เป็นเงิน BID ที่สามารถใช้เพื่อประมูลในเว็บไซต์ A Little Bid โดยที่ 10 BID มีค่าเท่ากับ 100 บาท</p>
                      <p>ผู้ประมูลจะได้สนุกกับการซื้อสินค้ามือสองที่หายาก จากเว็บประมูลชั้นนำระดับประเทศได้ที่นี่!</p>
                      <p></p>
                    </div>
                  </div>
                 </div>
                <div class="ui grid">
                    <div class="row">
                        <div class="eight wide column">
                            <div class="big ui orange label" id="hemail">
                                จำนวนบิดคงเหลือ    :
                            </div>
                        </div>
                        <div class="eight wide column">
                            <div class="ui input" id="em">
                                <h1 id="head">{{userData[0].Current_Bit}} บิด</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="eight wide column">
                            <div class="big ui orange label" id="hemail">
                                เต็มจำนวนบิด :
                            </div>
                        </div>
                        <div class="eight wide column">
                            <div class="ui input" id="em">
                                <input type="text"v-validate name="refill"  data-vv-validate-on="change|custom" v-model="formData.fill" class="form-control" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <button class="big ui orange button" id="sub" @click="checkForm">เติม BID!</button>
                        <span style="color:red;" v-if="errors.has('refill')">
                            กรุณาใส่ตัวเลขให้ถูกต้อง
                        </span>
                    </div>
                </div>    
            </div>      
        </div>
        
        
        
        
        
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
        checkForm(){
           this.$validator.validateAll().then((result)=>{
               console.log(this.formData.fill)
            if(result && this.formData.fill > 0 && (this.formData.fill % 1 ===0) ){
              console.log("Passed")
              this.refill()
            }
            else {
              console.log("Not valid")
                swal({
                    title: "กรุณากรอกจำนวนให้ถูกต้อง",
                    dangerMode: true,
                    icon: "warning",
                    button: "Close",
                });
                swal.stopLoading();
                swal.close();
            }
          })  
               
        },
        refill(){
            console.log(this.userData[0].Current_Bit+'/'+this.userData[0].Total_Bit+'/'+this.formData.fill)
            axios.get('http://alittlebid-mangese.c9users.io:8081/refill/'+this.userData[0].Current_Bit+'/'+this.userData[0].Total_Bit+'/'+this.formData.fill)
            .then(res=>{
                if(res.data.status=='success')
                {
                    console.log(res.data.current_bit)
                    console.log(res.data.total_bit)
                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                    .update({
                        Current_Bit:res.data.current_bit,
                        Total_Bit:res.data.total_bit
                    })
                    .then(res=>{
                        swal({
                            title: "เติมเงินสำเร็จ",
                            icon: "success",
                            button: "Close",
                        });
                        swal.stopLoading();
                        swal.close();
                        this.$router.replace('/main')
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
#login-window{
    border: 2px solid #a83e3e;
    width:  60%;
	margin: 5em auto;
	padding: 1em 1em 0em 1em;
    text-align: center;
	background: #ffffff;
}
#hemail{
    margin: 9px auto;
    text-align: right;
}
#uname{
    float: left;
    align: left;
}
label {
    padding-top: 10px;
    float: left;
}
.row{
    width: auto;
    /* margin: 10px auto; */
}
#em{
    width: 60%;
    margin: 9px auto;
    /* margin-bottom: 2em auto; */
    align-self: center;
    text-align: right;
    font-family: 'Kanit', 'Open Sans',sans-serif;
}

#sub{
    width: 40%;
    margin: 1em auto;
    font-family: 'Kanit', 'Open Sans',sans-serif;
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
</style>
