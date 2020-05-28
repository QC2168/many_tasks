<template>
    <view class="register">

        <view class="u-f-ajc logobox">
            <image src="../../static/images/logo/logo.png" mode="widthFix"></image>
        </view>
        <view class="u-f-ajc" style="color: #eeeeee;">WELCOME TO USE TASKAREA</view>
        <view>
            <u-cell-group>
                <u-field v-model="username" label="昵称" placeholder="请填写昵称" :error-message="checkUsername"></u-field>
                <u-field v-model="phone" label="手机号" placeholder="请填写手机号" :error-message="checkPhone">
                </u-field>
                <u-field password v-model="password" label="密码" placeholder="设置您的密码" :error-message="checkPassword">
                </u-field>
                <u-field password v-model="rpassword" label="确认密码" placeholder="确认设置您的密码" :error-message="checkRpassword">
                </u-field>
                <u-field :disabled="codeStatus" v-model="code" label="邀请码" placeholder="请填写邀请码 (可不填写)" :error-message="checkCode">
                </u-field>
                </u-field> 
            </u-cell-group>
        </view>
        <view class="btns">
            <u-button :ripple="true" ripple-bg-color="#909399" size="medium" shape="square" @tap="register">注册</u-button>
            <u-button @tap="back" :ripple="true" ripple-bg-color="#909399" size="medium" shape="square">返回</u-button>
        </view>
    </view>
</template>

<script>
    export default {
          onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
          if(option.INC){
              this.code=option.INC;
                this.codeStatus=true;
          }
                
            },
        data() {
            return {
                checkUsername:"",
                checkPhone:"",
                checkPassword:"",
                checkRpassword:"",
                checkCode:"",
                username: "",
                phone: "",
                password: "",
                rpassword: "",
                code: "",
                codeStatus:false

            };
        },
        methods: {
         
            
            // 返回
            back(){
                uni.navigateBack({
                    delta:1
                })
            },
            // 验证登录数据
            checkLogin() {
              if (!this.username.length >= 1 && this.username.length <=10) {
                    this.checkUsername="请输入标准的昵称";
                    return false;
                }
                if (!this.$u.test.mobile(this.phone)) {
                    this.checkPhone="请输入正确的手机号";
                    return false;
                }
                if (this.password.length < 4) {
                     this.checkPassword="请设置密码";

                    return false;
                }
                if (this.rpassword !== this.password) {
                     this.checkRpassword="两次录入的密码不一致";
                    return false;
                }
                if (this.code.length>10) {
                     this.checkCode="邀请码格式不正确";
                    return false;
                }
                return true;
            },

            //注册
            register() {
                if(!this.checkLogin()) return;
                this.$u.post('/register',{
                    username:this.username,
                    phone: this.phone,
                    password: this.password,
                    rpassword: this.rpassword,
                    code: this.code,
                }).then((res)=>{
                    if(!res)return;
                    if(res.errorCode===0){
                        uni.showToast({
                            title:"注册成功",
                        })
                       setTimeout(()=>{
                          uni.navigateTo({
                              url:"../login/login"
                          })
                       },1000)    
                    }
                })
            }





    },
    onReady() {

    }
    }
</script>

<style lang="scss" scoped>
    .register {
        .logobox {
            image {
                width: 300rpx;
            }

        }

        .btns {
            height: 150rpx;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
