<template>
    <div class="Edituser">
        <div class="center">
            <div class="row">
                <div class="ui raised segment">
                    <div class="ui orange ribbon label">
                        <h2 id="head" >
                            แก้ไขประวัติ
                        </h2>
                    </div>
                    <br><br><br>
                     <div class="row">
            <form >
            <div class="ui small form error">
                <div class="two fields">
                    <div class="field">
                        <div class="ui teal horizontal label">ชื่อจริง</div>
                        <input type="text" v-validate="'required'" data-vv-validate-on="change|custom" :data-vv-name="'firstname'" name="firstname" v-model="formData.firstname" placeholder="นาย แดเนียล" >
                        <span  v-if="errors.has('firstname')">
                            กรุณาใส่ชื่อจริง
                        </span>
                    </div>
                    <div class="field">
                        <div class="ui teal horizontal label">นามสกุล</div>
                        <input type="text" v-validate="'required'" data-vv-validate-on="change|custom" :data-vv-name="'lastname'" name="lastname" v-model="formData.lastname" placeholder="ศรีจุลโพธิ์" >
                        <span v-if="errors.has('lastname')">
                            กรุณาใส่นามสกุล
                        </span>
                    </div>
                </div>

                <div class="ui teal horizontal label">ชื่อ display</div>
                <div class="inline fields">
                <div class="ten wide field">
                    <input type="text" v-validate="'required'" data-vv-validate-on="change|custom" :data-vv-name="'displayname'" name="displayname" v-model="formData.displayname"  placeholder="Displayname">
                </div>
                <span v-if="errors.has('displayname')">
                    กรุณาใสชื่อ display
                </span>
                </div>
                <div class="ui teal horizontal label">เลขประจำตัวประชาชน</div>
                <div class="inline fields">
                <div class="eight wide field">
                    <input placeholder="รหัส 13 หลัก" v-validate="'required|numeric|min:13'" data-vv-validate-on="change|custom" :data-vv-name="'idcard'" name="idcard" v-model="formData.account_no" maxlength="13">   
                </div>
                <span v-if="errors.has('idcard')">
                    กรุณาใส่เลขประจำตัวประชาชนให้ถูกต้อง
                </span>
                </div>

                <div class="ui teal horizontal label">เบอร์โทรศัพท์</div>
                <div class="inline fields">
                <div class="eight wide field">
                    <input type="text" v-validate="'required|numeric'" data-vv-validate-on="change|custom" :data-vv-name="'telephone'" name="telephone" v-model="formData.telephone" placeholder="08xxxxxxxx" >               
                </div>
                <span v-if="errors.has('telephone')">
                    กรุณาใส่เบอร์โทรศัพท์ให้ถูกต้อง
                </span>

                </div>
                <div class="ui teal horizontal label" for="gender">เพศ</div>     
                <div class="inline fields">
                    <div class="field">
                        <select class="ui dropdown" v-model="formData.gender" v-validate="'required'" data-vv-validate-on="change|custom" :data-vv-name="'gender'" name="gender" >
                            <option value="Male">ชาย</option>
                            <option value="Female">หญิง</option>
                            <option value="Other">อื่นๆ</option>
                        </select>
                    </div>
                    <span v-if="errors.has('gender')">
                        กรุณาใส่เพศ
                    </span>
                </div>

                <div class="field">
                    <div class="ui teal horizontal label">ที่อยู่ปัจจุบัน</div>
                    <textarea rows="2" v-validate="'required'" data-vv-validate-on="change|custom" :data-vv-name="'address'" name="address"  v-model="formData.address" placeholder="11/11 หมู่บ้าน รักดี ต.บางบัวทอง อ.บางบัวทอง จ.นนทบุรี 11110"></textarea>
                    <span v-if="errors.has('address')">
                        กรุณาใส่ที่อยู่
                    </span>
                </div>
               
                <br><br>
                <div class="field" id="subb">
                    <div  :disabled="errors.any()" @click="checkForm" class="huge ui secondary button" id="head">บันทึก</div>
                </div>
                
            </div>
            </form>
        </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
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
                address:'',
                gender:'',
            },
            
        }
    },
    
    methods:{
        checkForm(){
           
        this.$validator.validateAll().then((result)=>{
        if(result){
          console.log("Passed")
          this.editUser()
        }
        else {
          console.log("Not valid")
            swal({
                title: "กรุณากรอกข้อมูลให้ครบ",
                dangerMode: true,
                icon: "warning",
                button: "Close",
            });
            swal.stopLoading();
            swal.close();
        }
      })  
                
      },
        editUser(){
            var user = firebase.auth().currentUser.uid;
            if(user!= null){
                firebase.database().ref('Users').child(user).update({
                    Account_No:this.formData.account_no,
                    Firstname:this.formData.firstname,
                    Lastname:this.formData.lastname,
                    Tel:this.formData.telephone,
                    Username:this.formData.displayname,
                    Address:this.formData.address,
                    Gender:this.formData.gender
                }).then( res =>{
                    swal({
                        title: "แก้ไขเรียบร้อย!",
                        icon: "success",
                        button: "Close",
                    });
                    swal.stopLoading();
                    swal.close();
                // console.log("OK")
              })
              .catch( error => {
                 console.log("error")
              })
            }
        }
            
    },
    created(){
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
        .once("value",snapshot=>{
            this.formData.account_no=snapshot.val().Account_No
            this.formData.firstname = snapshot.val().Firstname
            this.formData.lastname = snapshot.val().Lastname
            this.formData.telephone = snapshot.val().Tel
            this.formData.displayname = snapshot.val().Username
            this.formData.address  = snapshot.val().Address
            this.formData.gender = snapshot.val().Gender
        })
    }
}
</script>

<style>
.center {
    margin: auto;
    width: 50%;
    padding: 10px;
    border-color: darkgrey;
}
.error{
    color: red;
}
#subb{
    margin: 2em auto;
    text-align: center;
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
</style>

