<template>
    <div class="row">
        <div class="center">
            <div class="row">
                <div class="ui raised segment">
                    <div class="ui orange ribbon label">
                        <h2 id="head">
                            ลงทะเบียนสินค้า
                        </h2>
                    </div>
                    <br><br><br>
                    <div class="row">
                        <div class="ui small form error">
                            <br>
                            <div class="ten wide field">
                                <div class="large ui orange horizontal label">
                                      <i class="tag icon"></i>
                                      ชื่อสินค้า
                                </div>
                            </div>
                            <div class="inline fields">
                                <div class="ten wide field">
                                    <input v-validate="'required'" data-vv-validate-on="change|custom" :data-vv-name="'productname'" name="productname"  type="text" v-model = "Product.Name" placeholder="Product Name"/>
                                </div>
                                <div class="six wide field">
                                    <span  v-if="errors.has('productname')">
                                        กรุณาใส่ชื่อสินค้า
                                    </span>
                                </div>
                            </div>
                            <br>
                              
                            <div class="ten wide field">    
                                <div class="large ui orange horizontal label">
                                    <i class="edit icon"></i>
                                    รายละเอียดสินค้า
                                </div>
                            </div>
                            <div class="inline fields">
                                <div class="ten wide field">
                                    <textarea rows="3" v-validate="'required'" data-vv-validate-on="change|custom" :data-vv-name="'detail'" name="detail" v-model = "Product.Description"  placeholder="Description"></textarea>
                                </div>
                                <div class="six wide field">
                                    <span  v-if="errors.has('detail')">
                                        กรุณากรอกรายละเอียดสินค้า
                                    </span>
                                </div>
                            </div>
                            <br>
                            <div class="field">
                                <div class="large ui orange horizontal label">
                                  <i class="calendar alternate outline icon"></i>
                                  ช่วงเวลาของการประมูล
                                </div>
                                <br><br>
                                <div class="ui red horizontal label">
                                    วันที่เริ่มต้นประมูลคือวันแรกที่คุณลงทะเบียนสินค้า
                                </div>
                                <br><br>
             
                                <div class="two fields">
                                    <div class="field">
                                        <div class="ui orange horizontal label">วันที่สิ้นสุดการประมูล</div>
                                        <input type="date" v-model = "Product.Date_End">
                                    </div>
                                    <div class="inline fields" id="inline">
                                        <div class="ui orange horizontal label">เวลาที่สิ้นสุดการประมูล</div>
                                        <!--<input type="time" v-model = "Product.Time_End">-->
                                        <!--<div class="four wide field">-->
                                        <div class="two wide field"></div>
                                        <select v-model = "HrEnd" class="ui search dropdown" id="time"  value="00">
                                            <option value="">00</option>
                                            <!--<option selected="selected" value="00">00</option>-->
    										<option value="01">01</option>
    										<option value="02">02</option>
    										<option value="03">03</option>
    										<option value="04">04</option>
    										<option value="05">05</option>
    										<option value="06">06</option>
    										<option value="07">07</option>
    										<option value="08">08</option>
    										<option value="09">09</option>
    										<option value="10">10</option>
    										<option value="11">11</option>
    										<option value="12">12</option>
    										<option value="13">13</option>
    										<option value="14">14</option>
    										<option value="15">15</option>
    										<option value="16">16</option>
    										<option value="17">17</option>
    										<option value="18">18</option>
    										<option value="19">19</option>
    										<option value="20">20</option>
    										<option value="21">21</option>
    										<option value="22">22</option>
    										<option value="23">23</option>
                                        </select>
                                        
                                        <!--</div>-->
                                        <div class="one wide field" id="dot"></div>
                                        <div class="one wide field" id="dot">
                                            <div class="ui header" id="head">
                                                :
                                            </div>
                                        </div>
                                        <!--<div class="four wide field">-->
                                        <select v-model = "MinEnd" name="EndMin" class="ui search dropdown" id="time"  value="00">
    										<!--<option selected="selected" value="00">00</option>-->
    										<option value="">00</option>
    										<option value="05">05</option>
    										<option value="10">10</option>
    										<option value="15">15</option>
    										<option value="20">20</option>
    										<option value="25">25</option>
    										<option value="30">30</option>
    										<option value="35">35</option>
    										<option value="40">40</option>
    										<option value="45">45</option>
    										<option value="50">50</option>
    										<option value="55">55</option>
                                        </select>
                                        <div class="one wide field" id="dot"></div>
                                        <div class="one wide field" id="dot">
                                            <div class="ui header" id="head">
                                                น.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="field">
                                <div class="large ui orange horizontal label">
                                  <i class="bitcoin icon"></i>
                                ราคาของสินค้า
                                </div>
                                <br><br>
                                <div class="two fields">
                                    <div class="field">
                                        <div class="ui orange horizontal label">ราคาเริ่มต้น</div>
                                        <input type="text" v-model = "Product.Start_Bid"  placeholder="Start Bid" data-vv-validate-on="change|custom" :data-vv-name="'start'" name="start" v-validate="'required|numeric'"></input>
                                        <span v-if="errors.has('start')">
                                            กรุณาใส่ราคาเริ่มต้น
                                        </span>
                                    </div>
                                    <!--<div class="field">-->
                                    <!--    <div class="ui orange horizontal label">บิดเพิ่มขึ้น</div>-->
                                    <!--    <input type="text" v-model = "Product.Bid_Increse"  placeholder="Bid Increse" data-vv-validate-on="change|custom" :data-vv-name="'bidin'" name="bidin" v-validate="'required'"></input>-->
                                    <!--    <span v-if="errors.has('bidin')">-->
                                    <!--        กรุณาใส่บิดที่เพิ่มขึ้น-->
                                    <!--    </span>-->
                                    <!--</div>-->
                                </div>
                            </div>
                            <br>
                            <div class="field">  
                                <div class="large ui orange horizontal label">
                                  <i class="file image outline icon"></i>
                                  รูปสินค้า
                                </div>
                                <br><br>
                                <input type="file" @change="previewImage" accept="image/*" multiple id="file">
                                <div class="image-preview" v-for="image in this.Product.Image">
                                        <img class="preview" :src="image">
                                </div>
                            </div>
                            <br>
                            <div class="ui form">
                                <div class="inline fields">
                                    <div class="large ui orange horizontal label">
                                        <i class="th icon"></i>
                                        ประเภทสินค้า
                                    </div>
                                    <div class="one wide field" id="dot"></div>
                                    <select v-model = "type" class="ui search dropdown" id="type">
    										<!--<option selected="selected" value="00">00</option>-->
    										<option value="Shirt">เสื้อผ้า</option>
    										<option value="Pant">กางเกง</option>
    										<option value="Shoes">รองเท้า</option>
    										<option value="Watch">นาฬิกา</option>
    										<option value="Backpack">กระเป๋า</option>
    								</select>
                                </div>
                            </div>
                        </div>
                            
                            <div class="ui section divider"></div>
                            <div class="field" id="subb">
                                <button :disabled="errors.any()" class="large ui orange submit button" v-on:click="checkForm" id="head">
                                    <i class="check icon"></i>
                                    ยืนยัน
                                </button>
                            </div>
                            
                            <!--{{type}}-->
                            <!--<button type = "button" v-on:click="assignProduct"> Submit </button>-->
                        
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
    export default {
        data(){
            return {
                HrStr:"",
                MinStr:"",
                MinEnd:"",
                HrEnd:"",
                mydate:"",
                imageData: [],
                type:"",
                Product: {
                    Name:"",
                    Bid_Increse:"0",
                    Current_Price:"",
                    Date_End:"",
                    Date_Start:"",
                    Description:"",
                    Image:[],
                    Max_Bidder:"",
                    Start_Bid:"",
                    Time_End:"",
                    Time_Start:"",
                    U_ID:"",
                    Status:"inprocess"
                    
                }
            }
        },
        methods:{
           
            previewImage: function(event) {
            this.Product.Image=[];
            var input = event.target;
            for(let i = 0;i<input.files.length;i++)
            {
                if (input.files && input.files[i]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.Product.Image.push(e.target.result);
                }
                reader.readAsDataURL(input.files[i]);
            }
            }
            
        },
        checkForm(){
           
            this.$validator.validateAll().then((result)=>{
                console.log("Test")
                console.log(this.HrEnd+":"+this.MinEnd)
                console.log(this.Product.Date_End)
                console.log(this.Product.Date_End+' '+this.HrEnd+":"+this.MinEnd)
                var x1 =  moment(new Date).format('DD/MM/YYYY HH:mm');
                var x2 = moment(this.Product.Date_End+' '+this.HrEnd+":"+this.MinEnd, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm');
                var ms = moment(x1,"DD/MM/YYYY HH:mm:ss").diff(moment(x2,"DD/MM/YYYY HH:mm:ss"));
                console.log("now = " + x1)
                console.log("end = " + x2)
                var d = moment.duration(ms);
                var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                console.log(ms)
                if(result && ms <= 0){
                //   console.log(this.Product.Date_Start+' T '+this.Product.Time_Start+' T '+this.Product.Date_End+' T '+this.Product.Time_End)
                  this.assignProduct()
                }
                else if(ms > 0)
                {
                    console.log("Not valid")
                    swal({
                        title: "กรุณากรอกวันที่ปิดประมูลให้ถูกต้อง",
                        dangerMode: true,
                        icon: "warning",
                        button: "Close",
                    });
                    swal.stopLoading();
                    swal.close();
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
        changeDatePattern(date){
            var now = date
                var day = now.slice(-2)
                var month = now.slice(-5,-3)
                var year = now.slice(0,4)
                var fullday = month+'/'+day+'/'+year
                return fullday
        },
        changeTimePattern(time){
            var now = time
            console.log(now)
                var hour = now.slice(0,2)
                var min = now.slice(3,5)
                var AMPM = ""
                if(hour >= 12)
                {
                    hour = hour - 12 
                    AMPM = "PM"   
                }
                else
                {
                    AMPM = "AM"
                }
                var fulltime = hour+':'+min+':00 '+ AMPM
                return fulltime
        },
            assignProduct(){
               
                this.Product.Time_Start = this.HrStr+":"+this.MinStr
                this.Product.Time_End = this.HrEnd+":"+this.MinEnd
                this.Product.Date_Start = moment(new Date).format("MM/DD/YYYY")
                this.Product.Time_Start = this.changeTimePattern(moment(new Date).format("HH:mm:ss"))
                this.Product.Date_End = this.changeDatePattern(this.Product.Date_End)
                this.Product.Time_End = this.changeTimePattern(this.Product.Time_End)
                
                
                this.Product.Current_Price = this.Product.Start_Bid
                this.Product.Max_Bidder = "NULL"
                this.Product.U_ID = firebase.auth().currentUser.uid
                console.log(this.Product)

                axios.post('http://alittlebid-mangese.c9users.io:8081/assign/'+this.type,this.Product)
                .then((response) => {
                    console.log("Complete")
                    swal({
                        title: "ลงขายสำเร็จ!",
                        icon: "success",
                        button: "Close",
                    });
                    swal.stopLoading();
                    swal.close();
                    this.$router.replace('/')
                })
                .catch((error) => {
                //  console.log(error)
                })
                //var Productref = firebase.database().ref("Products/"+this.type);
                //Productref.push(this.Product)
                // console.log(this.Product)
            }
        
        }
}
</script>


<style scoped>
.center {
    margin: auto;
    width: 80%;
    padding: 10px;
    border-color: darkgrey;
}
#subb{
    margin: 2em auto;
    text-align: center;
}
.field{
    margin: 5px auto;
}
.error{
    color:red;
}
#time{
    width: 60px;
}
#inline{
    margin: 20px;
}
#file{
    width: 50%;
}
#dot{
    text-align: center;
    float: center;
}
#item{
    margin: 1em auto;
}
#type{
    width: 30%;
}
#head{
  font-family: 'Kanit', 'Open Sans',sans-serif;
}
</style>