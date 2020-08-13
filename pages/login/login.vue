<template>
    <view class="login">

        <view class="u-f-ajc logobox">
            <image src="../../static/images/logo/logo.png" mode="widthFix"></image>
        </view>
        <view class="u-f-ajc" style="color: #e2e2e2;">WELCOME TO USE FANS</view>
        <view class="inputBox u-f">
            <view class="content">
                <wInput
                				v-model="username"
                				type="text"
                				maxlength="18"
                				placeholder="请填写昵称"
                			></wInput>
                <wInput
                				v-model="password"
                				type="password"
                				maxlength="18"
                				placeholder="设置您的密码"
                			></wInput>
            </view>
   
        </view>
  
        <view>
 <!--           <u-cell-group>
                <u-field v-model="username" label="昵称" placeholder="请填写昵称">
                </u-field>
                <u-field v-model="password" password label="密码" placeholder="设置您的密码">
                </u-field>
            </u-cell-group> -->
        </view>
<!--        <view class="btns">
            <u-button @tap="login" :ripple="true" ripple-bg-color="#909399" size="medium" shape="square">登录</u-button>
            <u-button @tap="register" :ripple="true" ripple-bg-color="#909399" size="medium" shape="square">注册</u-button>
        </view> -->
        <space size="50"></space>
        <view class="btnBox">
            <view class="content">
                <wButton
                bgColor="#D6AD60"
                			class="wbutton"
                			text="登录"
                			@click.native="login()"
                		></wButton>
            </view>
    
        </view>
        <space size="80"></space>
        <view @tap="register" class="toRegister u-f-ajc">
            还没有账户？点击这里注册账号
        </view>
    </view>
</template>

<script>
    import user from "../../common/user.js"
    import wInput from '../../components/watch-login/watch-input.vue' //input
    import wButton from '../../components/watch-login/watch-button.vue' //button
    import space from "../../components/space/space.vue"
    export default {
        components:{
            wInput,wButton,space
        },
        data() {
            return {

                username: "",
                password: ""

            };
        },
        methods: {
          // 注册
          register(){
              uni.navigateTo({
                  url:"../register/register"
              })
          },
           //登录
           checkLogin() {
               if (this.username.length < 1 ||this.username.length > 10 ) {
                   uni.showToast({
                       title: '昵称长度必须在4-10之间',
                       icon: 'none',
                       duration: 2000
                   })
                   return false;
               }
               if (this.password.length < 4||this.username.length > 16 ) {
                   uni.showToast({
                       title: '密码长度必须在4-16之间',
                       icon: 'none',
                       duration: 2000
                   })
                   return false;
               }
               return true;
           },
            login() {
         this.$u.post('/login',{
             username:this.username,
             password:this.password
         }).then(res => {
               if (!res) return;
               if(res.errorCode!==0){
                    uni.showToast({
                 title: res.msg,
                 duration: 2000,
                 icon:"none"
             });
               }
            
         			        if (!res) return;
         			        if (res.errorCode===0 && res.data.token) {
         			            //缓存
         			           uni.setStorage({
         			               key: 'token',
         			               data:res.data.token,
         			               success() {
         			                   this.token=res.data.token;
         			               }
         			           });
         			       
         			             uni.showToast({
         			                 title: res.msg,
         			                 duration: 2000
         			             });
         			             setTimeout(()=>{ 
         			                uni.switchTab({
         			                    url:"../profile/profile"
         			                })
         			             },1000)          
         			        }
         			})
               
               // if (!this.checkLogin()) return;
               
           //     this.$minApi.login({
           //         username:this.username,
           //         password:this.username
           //     }).then((res) => {
           //        uni.showToast({
           //            title: res.msg,
           //            icon: 'none',
           //            duration: 2000
           //        });
           //         if (!res.data) return;
           //         if (res.errorCode===0 && res.data.token) {
           //             //缓存
           //            uni.setStorage({
           //                key: 'token',
           //                data:res.data.token,
           //                success() {
           //                    this.token=res.data.token;
           //                }
           //            });
                  
           //              uni.showToast({
           //                  title: res.msg,
           //                  duration: 2000
           //              });
           //              setTimeout(()=>{ 
           //                 uni.switchTab({
           //                     url:"../profile/profile"
           //                 })
           //              },1000)          
           //         }
           
                   
           //     })
           }

        }
    }
</script>

<style lang="scss" scoped>
    .login {
        .logobox {
            image {
                width: 300rpx;
            }

        }
.inputBox{
    justify-content: center;
    .content{
        width: 600rpx;
    }
}
.btnBox{
    justify-content: center;
}
        .btns {
            height: 150rpx;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .toRegister{
            color: #82848a;
             font-size: 32rpx;
        }
    }
</style>
