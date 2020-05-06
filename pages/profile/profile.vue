<template>
    <view :class="[mode?'profile':'profile linear-gradient']" v-if="userData">
        <template v-if="mode">
            <view class="userinfo">
                <view class="headimage">
                    <image class="animated bounceIn" :src="URL+userData.user_pic" mode="aspectFit"></image>
                </view>
                <view class="u-f-ajc">{{userData.username}}</view>
                <!--    <view class="vip u-f-ajc">
                    <u-tag class="animated bounceIn" text="VIP" mode="light" size="mini" shape="circle" type="error" />
                </view>
                <view class="u-f-ajc">
                   到期时间 2020-1-1
                </view> -->
            </view>
            <view>
                <u-grid :col="3">
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="renwu" @tap="to('myTaskOrder')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">我申请的任务</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="zichan" @tap="to('wallet')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">资产管理</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="tubiaozhizuomoban" @tap="to('team')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">团队</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="fabu" @tap="to('pushTask')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">发布任务</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="guanli" @tap="to('taskManagement')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">任务管理</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="guanyu" custom-prefix="custom-icon" @tap="to('about')" :size="46"></u-icon>
                        <view class="grid-text">关于</view>
                    </u-grid-item>
                </u-grid>
            </view>
        </template>

        <template v-if="!mode">
            <!-- model 头像 -->
            <view class="modelUser animated zoomInDown">
                <view class="userPic u-f-ajc">
                    <image class="animated flipInX" :src="URL+userData.user_pic" mode="aspectFit"></image>
                </view>
                <view class="line">
                    <view class="one">{{userData.username}}</view>
                    <view>2</view>
                </view>
            </view>

            <view class="modelTask animated zoomInLeft">
                <view class="u-f-ajc" @tap="to('myTaskOrder')">
                    <image src="../../static/images/profile/myTaskOrderSn.png" mode="aspectFill">
                        <view>待审核</view>
                    </image>
                </view>
                <view class="u-f-ajc" @tap="to('myTaskOrder')">
                    <image src="../../static/images/profile/examine.png" mode="aspectFill"></image>
                    <view>审核中</view>
                </view>
                <view class="u-f-ajc" @tap="to('myTaskOrder')">
                    <image src="../../static/images/profile/success.png" mode="aspectFill"></image>
                    <view>完成</view>
                </view>
            </view>

            <view class="modelFunction animated zoomInUp">
                <view @tap="to('wallet')" class="line">
                 
                        <view class="iicon u-f-ajc"><image src="../../static/images/profile/list/wallet.png" mode="aspectFill"></image></view>
                        
                         <view class="text">钱包</view>          
                </view>
                <view @tap="to('pushTask')" class="line">
                 
                        <view class="iicon u-f-ajc"><image src="../../static/images/profile/list/push.png" mode="aspectFill"></image></view>
                        
                         <view class="text">发布新任务</view>          
                </view>
                <view @tap="to('taskManagement')" class="line">
                 
                        <view class="iicon u-f-ajc"><image src="../../static/images/profile/list/myTaskOrder.png" mode="aspectFill"></image></view>
                        
                         <view class="text">我发布过的任务</view>          
                </view>
                <view @tap="to('team')" class="line">
                 
                        <view class="iicon u-f-ajc"><image src="../../static/images/profile/list/team.png" mode="aspectFill"></image></view>
                        
                         <view class="text">邀请赚钱</view>          
                </view>
                <view @tap="to('about')" class="line">
                 
                        <view class="iicon u-f-ajc"><image src="../../static/images/profile/list/about.png" mode="aspectFill"></image></view>
                        
                         <view class="text">关于</view>          
                </view>
                <view @tap="outin" class="line">
                 
                        <view class="iicon u-f-ajc"><image src="../../static/images/profile/list/exit.png" mode="aspectFill"></image></view>
                        
                         <view class="text">退出</view>          
                </view>
            </view>
        </template>
        <view class="change u-f-ajc" @tap="changeMode">切换{{mode?"标准":"简约"}}模式</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                mode: false,
                userData: [],
                URL: getApp().globalData.URL,
            };
        },
        onLoad() {
            this.getdata()
        },
        methods: {
            changeMode() {
                this.mode = !this.mode;
            },
            getdata() {
                this.$u.get('/get_user').then(res => {
                    if (res.errorCode !== 0) return;
                    this.userData = res.data[0]
                })
            },
            to(page) {
                uni.navigateTo({
                    url: `../${page}/${page}`
                })

            },
            login() {
                uni.navigateTo({
                    url: "../login/login"
                })
            },
            register() {
                uni.navigateTo({
                    url: "../register/register"
                })
            },
            outin() {
                uni.clearStorage();
                uni.reLaunch({
                    url: "../login/login"
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .linear-gradient {
        background-image: linear-gradient(#acb6e5, #74ebd5);
    }

    .profile {
        padding: 25rpx 0 0 0;

        height: 100vh;

        .change {
            color: #007AFF;
            font-size: 30rpx;
            text-decoration: underline;
            margin: 20rpx 0;
        }

        .userinfo {
            margin-bottom: 100rpx;

            .headimage {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 100rpx;
                height: 220rpx;

                image {
                    width: 200rpx;
                    height: 200rpx;
                    border-radius: 100%;
                    border: .5rpx solid gray;
                }
            }

            .vip {
                height: 70rpx;
                width: 100%;
            }
        }

        .grid-text {
            font-size: 28rpx;
            margin-top: 6rpx;
            color: $u-type-info;
        }

        .modelUser {
            width: 90%;
            height: 160rpx;
            border-radius: 25rpx;
            margin: 0 auto;
            box-shadow: 3rpx 3rpx 3rpx #cbcbcb;
            display: flex;
            background-color: white;

            .userPic {
                width: 180rpx;
                margin: 0 20rpx;

                image {
                    width: 120rpx;
                    height: 120rpx;
                    border-radius: 100%;
                    border: .5rpx solid #EEEEEE;
                }
            }

            .line {
                width: 100%;
                padding: 20rpx;

                .one {
                    font-size: 35rpx;
                }

            }

        }

        .modelTask {
            background-color: white;
            padding: 10rpx 0 0 0;
            width: 90%;
            height: 128rpx;
            border-radius: 25rpx;
            margin: 25rpx auto;
            box-shadow: 3rpx 3rpx 3rpx #cbcbcb;
            display: flex;

            view {

                flex: 1;
                flex-direction: column;
                text-align: center;
                width: 100%;
                height: 100%;
                font-size: 26rpx;

                image {
                    width: 72rpx;
                    height: 72rpx;
                }
            }
        }

        // .modelFunction{
        //     width: 90%;
        //     height: 500rpx;
        //     border-radius:25rpx;
        //     margin: 25rpx auto;
        //     box-shadow: 3rpx 3rpx 3rpx #cbcbcb;
        //     view{

        //     }
        // }
        .modelFunction {
            .line {
                display: flex;
                background-color: white;
               width: 90%;
                height: 70rpx;
                border-radius: 25rpx;
                margin: 25rpx auto;
                box-shadow: 3rpx 3rpx 3rpx #cbcbcb;
                padding: 0 30rpx;
                line-height: 70rpx;
                font-size: 28rpx;
                .iicon {
                    
                    width: 70rpx;
                    height: 70rpx;
                    image {
                        width: 45rpx;
                        height: 45rpx;
                    }
                    margin: 0 20rpx 0 0;
                }

                .text {
              flex: 1;

                }
            }

        }
    }
</style>
