<template>
    <view class="login">

        <view class="u-f-ajc logobox">
            <image src="../../static/images/logo/logo.png" mode="widthFix"></image>
        </view>
        <view class="u-f-ajc" style="color: #eeeeee;">WELCOME TO USE TASKAREA</view>
        <view>
            <u-cell-group>
                <u-field v-model="username" label="昵称" placeholder="请填写昵称">
                </u-field>
                <u-field v-model="password" password label="密码" placeholder="设置您的密码">
                </u-field>
            </u-cell-group>
        </view>
        <view class="btns">
            <u-button @tap="login" :ripple="true" ripple-bg-color="#909399" size="medium" shape="square">登录</u-button>
            <u-button @tap="register" :ripple="true" ripple-bg-color="#909399" size="medium" shape="square">注册</u-button>
        </view>
    </view>
</template>

<script>
    import user from "../../common/user.js"
    export default {
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
               if (this.username.length < 1) {
                   uni.showToast({
                       title: '昵称不符合规则',
                       icon: 'none',
                       duration: 2000
                   })
                   return false;
               }
               if (this.password.length < 6) {
                   uni.showToast({
                       title: '密码不符合规则',
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

        .btns {
            height: 150rpx;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
