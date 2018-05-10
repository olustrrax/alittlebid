<template>
  <div class="register">
<div class="center">
    <div class="row">
    <div class="ui raised segment">
        <div class="ui orange ribbon label">
            <h2 >
                ลงทะเบียน
            </h2>

        </div>
    
        <br><br><br>
        <div class="row">
            <div class="ui small form error">
                <div class="two fields">
                    <div class="field">
                        <div class="ui teal horizontal label">ชื่อจริง</div>
                        <input type="text" v-model="formData.firstname" placeholder="นาย แดเนียล" >
                    </div>
                    <div class="field">
                        <div class="ui teal horizontal label">นามสกุล</div>
                        <input type="text" v-model="formData.lastname" placeholder="ศรีจุลโพธิ์" >
                    </div>
                </div>
                <div class="field">
                  <div class="ui teal horizontal label">รูปประจำตัว</div>
                  <input type="text" v-model="formData.displayname" class="form-control" placeholder="Displayname">
                </div>
                <div class="ui teal horizontal label">บัตรประจำตัวประชาชน</div>
                <div class="inline fields">
                <div class="six wide field">
                    <input placeholder="1111111111" type="text">
                </div>
                </div>
                <div class="ui teal horizontal label">เบอร์โทรศัพท์</div>
                <div class="inline fields">
                <div class="six wide field">
                    <input type="text" v-model="formData.telephone" placeholder="08xxxxxxxx" >
                </div>
                </div>
                <div class="ui teal horizontal label" for="gender">เพศ</div>     
                <div class="inline fields">
                    <div class="field">
                        <select>
                            <option value="1">ชาย</option>
                            <option value="0">หญิง</option>
                            <option value="0">อื่นๆ</option>
                        </select>
                        
                    </div>
                </div>

                <div class="field">
                    <div class="ui teal horizontal label">ที่อยู่ปัจจุบัน</div>
                    <textarea rows="2" v-model="formData.address" placeholder="11/11 หมู่บ้าน รักดี ต.บางบัวทอง อ.บางบัวทอง จ.นนทบุรี 11110"></textarea>
                </div>
                <br><br><br>
                <div class="ui submit button" @click="editUser">สมัครสมาชิก</div>
            </div>
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
                firstname:'',
                lastname:'',
                telephone:'',
                account_no:'',
                displayname:'',
                address:''
            },
            
        }
    },
    methods:{
        editUser(){
            firebase.database().child('Users').child(firebase.auth().currentUser.uid)
            .update({
                Account_No:this.formData.account_no,
                Firstname:this.formData.firstname,
                Lastname:this.formData.lastname,
                Image:"null",
                Tel:this.formData.telephone,
                Username:this.formData.displayname
            })
        }
    },
    created(){
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
        .once("value",snapshot=>{
            this.formData=[],
            this.formData.push(snapshot.val())
        })
    }
}
</script>

<style>

</style>

