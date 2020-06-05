<template>
    <view class="about">
        <view class="logobox u-f-ajc">
            <image @tap="showfeelback=!showfeelback" src="../../static/images/logo/logo.png" mode="aspectFill"></image>
        </view>
        <!-- #ifdef APP-PLUS -->
        <view class="u-f-ajc v">
            当前版本 {{v}}
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <view class="u-f-ajc v">
            当前版本 {{v}}
        </view>
        <!-- #endif -->
       
        <u-divider height="100" class="animated rotateInUpLeft" v-show="showfeelback">意见反馈</u-divider>
        <u-cell-group v-show="showfeelback" class="animated rotateInUpLeft">
            <u-field v-model="value" label="反馈内容" placeholder="请填写您的意见" type="textarea" maxlength="80" confirm-type="反馈内容"
                label-width="165" icon="edit-pen">
            </u-field>
        </u-cell-group>
        <view class="btn u-f-ajc">
            <u-button v-show="showfeelback" @tap="post" type="primary" size="medium" class="animated rotateInUpLeft">提交反馈</u-button>
            <u-button @tap="update()" type="primary" size="medium">检查更新</u-button>
        </view>
        <view @tap="tochangepassword" class="tochangepassword u-f-ajc">
            点击修改账号密码
        </view>
    </view>
</template>

<script>
    export default {
        created(){
         
        },
        data() {
            return {
                value: "",
                showfeelback: false,
                //#ifdef APP-PLUS
                v:plus.runtime.version,
                //#endif
                //#ifdef H5
                v:require("package.json").version
                //#endif
               
            }
        },
        methods: {
            async post() {
                if (this.value.length == 0) {
                    uni.showToast({
                        title: "说点什么吧...",
                        icon: "none"
                    })
                    return;
                }
                if (this.value.length <= 5) {
                    uni.showToast({
                        title: "内容太少了",
                        icon: "none"
                    })
                    return;
                }
                await this.$u.post('/feedback', {
                    feedback_content: this.value
                }).then(res => {
                    if (res.errorCode !== 0) return;
                    uni.showToast({
                        title: '感谢您的反馈'
                    })
                    return;
                })
            },
            async update() {
                //#ifdef H5
                uni.showToast({
                    title:"无需更新",
                    icon:'none'
                })
                //#endif
                //#ifdef APP-PLUS
               //版本判断
               await this.$u.post('updateV', {
                   v:this.v
               }).then(res => {
                   if (res.errorCode === 0) {
                       // 新版本
                       uni.showModal({
                           title: '探索到新版本',
                           content: res.data.content,
                           success: (model)=>{
                               if (model.confirm) {
                                 plus.runtime.openURL(res.data.url);
                               } else if (model.cancel) {
                                   uni.showToast({
                                       title: "建议更新到最新版本",
                                       icon: "none"
                                   })
                               }
                           }
                       });
                   }
                   if (res.errorCode === 20011) {
                       uni.showToast({
                           title: "当前已是最新版本",
                           icon: "none"
                       })
                   }
               
               })
                //#endif
               
            },
            tochangepassword(){
                uni.navigateTo({
                    url:'../changePassword/changePassword'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .about {
        .logobox {
            image {
                height: 350rpx;
                width: 350rpx;
            }

        }

        .v {
            font-size: 24rpx;
            margin: 30rpx 0;
        }

        .btn {
            width: 100%;
            height: 200rpx;
        }
        .tochangepassword{
            font-size: 28rpx;
            color: blue;
            position: absolute;
            bottom: 10rpx;
            text-decoration: underline;
            width: 100%;
            }
            
    }
</style>
