<template>
    <view v-if="userData.length!==0" :style="'height:'+view_height+'px'" :class="[mode?'profile':'profile linear-gradient']">
        <template v-if="mode">
            <view class="userinfo">
                <view class="headimage" >
                    <image class="animated bounceIn" @tap="changeUserPic" :src="URL+userData.user_pic" mode="aspectFit"></image>
                </view>
                <view class="u-f-ajc">{{userData.username}}</view>
                <template v-if="userData.privilege">
                    <view v-if="userData.privilege.vip===0" class="u-f-ajc buyVip" @tap="to('buyVip')">点击购买VIP 畅享特权</view>
                    <view class="vip u-f-ajc">
                        <u-tag v-if="userData.privilege.vip!==0&&userData.privilege.vip===1" class="animated bounceIn"
                            text="VIP" mode="light" size="mini" shape="circle" type="error" />
                        <u-tag v-if="userData.privilege.vip!==0&&userData.privilege.vip===2" class="animated bounceIn"
                            text="SVIP" mode="light" size="mini" shape="circle" type="error" />
                        <u-tag v-if="userData.privilege.vip!==0&&userData.privilege.vip===3" class="animated bounceIn"
                            text="SSVIP" mode="light" size="mini" shape="circle" type="warning" />
                    </view>
                    <view class="u-f-ajc expireTime" v-if="userData.privilege.vip!==0">
                        特权到期时间: {{userData.privilege.expire_time|formatDate('yyyy-MM-dd hh:mm')}}
                    </view>
                </template>

            </view>
            <view>
                <u-grid :col="3">
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="renwu" @tap="to('myTaskOrder')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">申请</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="zichan" @tap="to('wallet')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">资产</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="tubiaozhizuomoban" @tap="to('team')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">团队</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="fabu" @tap="to('pushTask')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">发布</view>
                    </u-grid-item>
                    <u-grid-item class="animated bounceIn">
                        <u-icon name="guanli" @tap="to('taskManagement')" custom-prefix="custom-icon" :size="46"></u-icon>
                        <view class="grid-text">管理</view>
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
            <view class="modelUser animated fadeIn">
                <view class="userPic u-f-ajc">
                    <image class="animated flipInX" @tap="changeUserPic" :src="URL+userData.user_pic" mode="aspectFit"></image>
                </view>
                <view class="line">
                    <view class="one">{{userData.username}}</view>
                    <view v-if="userData.privilege.vip===0" class="buyVip" @tap="to('buyVip')">点击购买VIP 畅享特权</view>
                    <view class="vip">
                        <u-tag v-if="userData.privilege.vip!==0" class="animated bounceIn"
                            :text="'V'+userData.privilege.vip" mode="light" size="mini" shape="circle" type="error" />
                       
                    </view>
                    <view class="expireTime" v-if="userData.privilege.vip!==0">
                        特权到期时间: {{userData.privilege.expire_time|formatDate('yyyy-MM-dd hh:mm')}}
                    </view>
                </view>
            </view>
<!-- 当天收入 -->
<!-- <view class="todayWallet">

  
</view> -->
            <view class="modelTask animated fadeIn">
                <view class="u-f-ajc" @tap="to('myTaskOrder','toBeSubmitted')">
                    <image src="../../static/images/profile/myTaskOrderSn.png" mode="aspectFill">
                        <view>待提交</view>
                    </image>
                </view>
                <view class="u-f-ajc" @tap="to('myTaskOrder','underReview')">
                    <image src="../../static/images/profile/examine.png" mode="aspectFill"></image>
                    <view>审核中</view>
                </view>
                <view class="u-f-ajc" @tap="to('myTaskOrder','complete')">
                    <image src="../../static/images/profile/success.png" mode="aspectFill"></image>
                    <view>已完成</view>
                </view>
            </view>

            <view class="modelFunction animated fadeIn">
                <view @tap="to('wallet')" class="line">

                    <view class="iicon u-f-ajc">
                        <image src="../../static/images/profile/list/wallet.png" mode="aspectFill"></image>
                    </view>

                    <view class="text">钱包 （ 今天总收益 ：{{todaySum}} 元 ）</view>
                </view>
                <view @tap="to('pushTask')" class="line">

                    <view class="iicon u-f-ajc">
                        <image src="../../static/images/profile/list/push.png" mode="aspectFill"></image>
                    </view>

                    <view class="text">开始发布任务</view>
                </view>
                <view @tap="to('taskManagement')" class="line">

                    <view class="iicon u-f-ajc">
                        <image src="../../static/images/profile/list/myTaskOrder.png" mode="aspectFill"></image>
                    </view>

                    <view class="text">我发布过的任务</view>
                </view>
                <view @tap="to('team')" class="line">

                    <view class="iicon u-f-ajc">
                        <image src="../../static/images/profile/list/team.png" mode="aspectFill"></image>
                    </view>

                    <view class="text">分享赚钱</view>
                </view>
                <view @tap="to('about')" class="line">

                    <view class="iicon u-f-ajc">
                        <image src="../../static/images/profile/list/about.png" mode="aspectFill"></image>
                    </view>

                    <view class="text">关于</view>
                </view>
                <view @tap="outin" class="line">

                    <view class="iicon u-f-ajc">
                        <image src="../../static/images/profile/list/exit.png" mode="aspectFill"></image>
                    </view>

                    <view class="text">退出</view>
                </view>
            </view>
        </template>
        <view class="change u-f-ajc" @tap="changeMode">切换{{mode?"标准":"简约"}}模式</view>
    </view>
</template>

<script>
    export default {
        onPullDownRefresh(){
            // #ifdef  APP-PLUS
            plus.nativeUI.toast("正在刷新数据...");
            // #endif
             this.getdata()
        },
        data() {
            return {
                mode: false,
                userData: [],
                todaySum:0,
                URL: getApp().globalData.URL,
                view_height:0,
                //  上传图片的header
                updateUserPicHeader:{}
            };
        },
        created() {
             this.getdata();
            // 为图片上传添加请求头
              uni.getStorage({
                  key:'token',
                  success:(res)=>{
                      this.updateUserPicHeader.token=res.data
                  }
              }) ;
           
 uni.getSystemInfo({
                success:(res)=>{
                    this.view_height=res.windowHeight;
                }
            })
        },
        onNavigationBarButtonTap(e) {
            if (e.index === 0) {
                this.to('sign')
            }
        },
        methods: {
            changeMode() {
              
                this.mode = !this.mode;
                  uni.setStorageSync('proMode',this.mode.toString())
            },
           async getdata() {
                await this.$u.get('/get_user').then(res => {
                    if (res.errorCode !== 0) return;
                    this.userData = res.data[0];
                    // userData.privilege.vip
                    uni.setStorageSync('V',this.userData.privilege.vip.toString())
                    uni.stopPullDownRefresh();
                })
                await this.$u.get('/get_user_today_wallet_details_sum').then((res)=>{
                    this.todaySum=res.data
                })
                
            },
            to(page,type) {
                if(type){
                  uni.navigateTo({
                      url: `../${page}/${page}?type=${type}`,
                      
                  })
                }else{
                    uni.navigateTo({
                        url: `../${page}/${page}`
                    })
                }
               
            },
            login() {
                uni.navigateTo({
                    url: "../login/login"
                })
            },
            changeUserPic(){
                uni.chooseImage({
                    count:1, //默认9
                    sizeType: [ 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success:  (res) =>{
                       const tempFilePaths = res.tempFilePaths;
                       uni.uploadFile({
                                  url: this.URL+'/api/v1/upload_user_pic', //接口地址
                                   // url: '/api/v1/upload_user_pic', //接口地址
                                  filePath: tempFilePaths[0],
                                  name: 'user_pic',
                                  header:this.updateUserPicHeader,
                                  success: (res) => {
                                      let data=JSON.parse(res.data)
                                      uni.showToast({
                                          title:data.msg,
                                          icon:"none"
                                      })
                                         this.getdata()
                                  }
                              });
                    },
                });
            },
            register() {
                uni.navigateTo({
                    url: "../register/register"
                })
            },
            outin() {
                uni.showModal({
                    title: '提示',
                    content: '确认退出登录吗',
                    success: (res)=>{
                        if (res.confirm) {
                            uni.clearStorage();
                            uni.reLaunch({
                                url: "../login/login"
                            })
                        }
                    }
                });

            }
        }
    }
</script>

<style lang="scss" scoped>
    .linear-gradient {
        background-image: linear-gradient(#eaeaea, #b4b4b4);
    }

    .profile {
        background-image: white;
        padding: 25rpx 0 0 0;

        .change {
            color: #007AFF;
            font-size: 30rpx;
            text-decoration: underline;
            margin: 20rpx 0;
        }

        .userinfo {
            margin-bottom: 25rpx;

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

            .buyVip {
                color: red;
                font-size: 20rpx;
                text-decoration: underline;
                margin-top: 6rpx;
            }

            .vip {
                height: 70rpx;
                width: 100%;
            }

            .expireTime {
                color: red;
                font-weight: bold;
                font-size: 26rpx;
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
            border-radius: 15rpx;
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
                    font-size: 30rpx;
                }

                .buyVip {
                    color: red;
                    font-size: 20rpx;
                    text-decoration: underline;
                    margin: 10rpx 0;
                }

                .vip {
                    height: auto;
                    width: 100%;
                }

                .expireTime {
                    color: red;
                    font-weight: bold;
                    font-size: 26rpx;
                }
            }


        }

        .todayWallet,.modelTask {
            background-color: white;
            padding: 10rpx 0 0 0;
            width: 90%;
            height: 128rpx;
            border-radius: 15rpx;
            margin: 25rpx auto;
            box-shadow: 3rpx 3rpx 3rpx #cbcbcb;
            display: flex;
letter-spacing: 3rpx;
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
                height: 90rpx;
                border-radius: 10rpx;
                margin: 25rpx auto;
                box-shadow: 3rpx 3rpx 3rpx #cbcbcb;
                padding: 0 30rpx;
                line-height: 90rpx;
                font-size: 28rpx;
                letter-spacing: 3rpx;
                .iicon {

                    width: 70rpx;
                    height: 90rpx;

                    image {
                        width: 50rpx;
                        height: 50rpx;
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
