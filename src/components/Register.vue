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
                        <input placeholder="นาย แดเนียล" type="text">
                    </div>
                    <div class="field">
                        <div class="ui teal horizontal label">นามสกุล</div>
                        <input placeholder="ศรีจุลโพธิ์" type="text">
                    </div>
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
                    <input placeholder="เบอร์โทรศัพท์" type="text">
                </div>
                </div>
                <div class="ui teal horizontal label" for="gender">เพศ</div>     
                <div class="inline fields">
                    <div class="field">
                        <select>
                            <!-- <option value="">เพศ</option> -->
                            <option value="1">ชาย</option>
                            <option value="0">หญิง</option>
                            <option value="0">อื่นๆ</option>
                        </select>
                        <!-- <div class="ui radio checkbox">
                            <input name="gender" tabindex="0" value="M"  type="radio">
                            <label>ชาย</label>
                        </div> -->
                    </div>
                    <!-- <div class="field">
                    <div class="ui radio checkbox">
                        <input name="gender" tabindex="0" value="F" type="radio">
                        <label>หญิง</label>
                    </div>
                    </div>
                    <div class="field">
                    <div class="ui radio checkbox">
                        <input name="gender" tabindex="0" value="O" type="radio">
                        <label>อื่นๆ</label>
                    </div>
                    </div> -->
                   
                </div>

                <div class="field">
                    <div class="ui teal horizontal label">ที่อยู่ปัจจุบัน</div>
                    <textarea rows="2" placeholder="11/11 หมู่บ้าน รักดี ต.บางบัวทอง อ.บางบัวทอง จ.นนทบุรี 11110"></textarea>
                </div>
                <div class="six wide field">
                    <input placeholder="เบอร์โทรศัพท์" type="text">
                </div>
                <br><br><br>
                <div class="ui submit button" @click="regis">สมัคร</div>
            </div>
        </div>
        
    </div>

    </div>
</div> 
</div>
</template>

<script>
export default {
  name: "register",
  methods:{
      regis(){
          
      }
  }
}

// $('.ui.radio.checkbox')
//   .checkbox();
</script>


</style>

<style>
/* @import url('./jquery.Thailand.js/dist/jquery.Thailand.min.css'); */
.center {
    margin: auto;
    width: 50%;
    padding: 10px;
    border-color: darkgrey;
}
</style>
