<template>
    <view class="walletAuth">
        <view class="u-f-ajc logobox">
            <image src="../../static/images/logo/logo.png" mode="widthFix"></image>
        </view>
        <u-field v-model="zfb" label="支付宝" placeholder="请填写您的支付宝账户">
        </u-field>
        <u-field v-model="name" label="姓名" placeholder="请填写您的姓名">
        </u-field>
        <view class="btns u-f-ajc">
            <view @tap="auth" class="auth u-f-ajc">
                认证
            </view>
        </view>
        <view class="u-f-ajc" style="color: red;font-weight: bold;">
            注意：认证姓名必须与支付宝实名信息一致
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                zfb: "",
                name: ""
            };
        },
        methods: {
            auth() {
                this.$u.post('/userAuth', {
                    zfb: this.zfb,
                    name: this.name
                }).then((res) => {
                    uni.showToast({
                        title:res.msg,
                        icon:'none',
                        success() {
                            uni.redirectTo({
                                url:"../wallet/wallet"
                            })
                        }
                    })
                })
            }
        },

    }
</script>

<style lang="less">
    .walletAuth {
        .logobox {
            image {
                width: 300rpx;
            }

        }

        .btns {
            width: 100%;
            height: 200rpx;

            .auth {
                color: #FFFFFF;
                font-size: 30rpx;
                white-space: nowrap;
                overflow: hidden;
                width: 601rpx;
                height: 80rpx;
                background: #D6AD60;
                box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.4);
                border-radius: 2.5rem;
                margin-top: 0rpx;
            }
        }
    }
</style>
