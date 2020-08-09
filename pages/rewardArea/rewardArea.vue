<template>
    <view class="rewardArea">
        <u-modal v-model="updateModal" @confirm="downloadApp" show-cancel-button :content="updateModalContent"></u-modal>
        <u-notice-bar v-if="noticeList.length" mode="vertical" :list="noticeList"></u-notice-bar>
        <view class="rewardPanl" v-for="(item) in hbList" :key="item.hd_id" @tap="toDetail(item.hb_id)">
            <view class="userinfo u-f-ac">
                <image class="userPic" :src="URL+item.user.user_pic" mode="scaleToFill"></image>
                <view class="username">{{item.username}}</view>

                <view class="rewardIconBox">
                    <image class="rewardIcon" src="../../static/images/rewardArea/hongbao.png" mode="aspectFill"></image>

                </view>
                <view class="tag">
                    <u-tag :text="' '+item.tag+' '" shape="circle" mode="dark" type="error" size="mini" />
                </view>
            </view>
            <view class="content">
                {{item.content}}
            </view>
            <view class="miniImages" v-if="Object.keys(item.hb_area_pic).length!==0">
                <image v-for="(item,index) in item.hb_area_pic" :key="item.pic" class="img" :src="URL+item.pic" mode="scaleToFill"></image>
            </view>
            <view class="bottom u-f-ac">
                <view class="count">
                    {{item.hb_area_comment_list.length}}
                </view>
                <u-icon name="pinglun" custom-prefix="custom-icon" size="45" color="#888888"></u-icon>

            </view>
            <space bgColor="#f4f4f5" size="3"></space>
        </view>
        <!-- 添加红包 -->
        <image @tap="addHb" src="../../static/images/rewardArea/addHb.png" class="addHb" mode="widthFix"></image>
        <image @tap="sign" src="../../static/images/rewardArea/sign.png" class="sign" mode="widthFix"></image>

    </view>
</template>

<script>
    import space from "../../components/space/space.vue"
    export default {
        components: {
            space
        },
        created() {
            this.getData();
            // #ifdef H5
            this.getDownloadAppAddress()
            // #endif
            // 查看是否显示说明
            const use = uni.getStorageSync('use');
           if(use!=1){
               uni.showModal({
                                        showCancel: false,
                                        title: '如何获得更多人脉',
                                        content: '点击右侧 + 号图标，免费发布广告（例如：您的产品广告、微信二维码 等广告信息），获得红包奖励，邀请也有红包奖励！',
                                        confirmText: "知道了，不再提示",
                                        success: (model) => {
                                            if (model.confirm) {
                                                uni.setStorageSync('use', '1');
                                            }
                                        }
                                    });
           }
           

     

        },
        data() {
            return {
                updateModal: false,
                appAddress: '',
                updateModalContent: 'APP版本现已推出，是否马上下载~',
                URL: getApp().globalData.URL,
                noticeList: [],
                hbList: [],
                // page index
                index: 1,
                //#ifdef APP-PLUS
                v: plus.runtime.version
                //#endif
            };
        },
        onPullDownRefresh() {
            this.getData();

        },
        methods: {
            async getDownloadAppAddress() {
                await this.$u.post('/updateV', {
                    v: '1.0.0'
                }).then(res => {
                    this.updateModal = true;
                    this.appAddress = res.data.url;
                })
            },
            downloadApp() {
                window.open(this.appAddress)
            },
            addHb() {
                this.$u.route('pages/pushHb/pushHb')
            },
            sign(){
                    this.$u.route('pages/sign/sign')
            },
            toDetail(hb_id) {
                this.$u.route('/pages/rewardDetail/rewardDetail', {
                    hb_id
                });
            },
            async getData() {
                // 检查新版本
                //  #ifdef APP-PLUS
                await this.$u.post('/updateV', {
                    v: plus.runtime.version
                }).then(res => {
                    if (res.errorCode === 0) {
                        // 新版本
                        uni.showModal({
                            showCancel: false,
                            title: '探索到新版本',
                            content: res.data.content,
                            confirmText: "更新",
                            success: (model) => {
                                if (model.confirm) {
                                    plus.runtime.openURL(res.data.url);
                                }
                                if (model.cancel) {
                                    plus.runtime.openURL("避免功能差异，请更新版本");
                                }
                            }
                        });
                    }


                })
                //  #endif
                // 获取通知栏
                await this.$u.get('/get_hb_area_notice_bar').then(res => {
                    this.noticeList = [];
                    res.data.forEach(item => {
                        this.noticeList.push(item.content)
                    })
                })
                // 获取红包列表
                await this.$u.get('/get_hb_area_list', {
                    index: this.index
                }).then(res => {
                    this.hbList = res.data;
                    uni.stopPullDownRefresh()
                })
            }
        },

    }
</script>

<style lang="scss">
    .rewardArea {
        .rewardPanl {
            padding: 10rpx 25rpx;
            margin: 5rpx 0 14px 0;

            .userinfo {
                height: 110rpx;

                .userPic {
                    width: 67rpx;
                    height: 67rpx;
                    border-radius: 100%;
                    border: 1rpx solid #C8C7CC;
                    margin: 0 10px 0 10rpx;
                }

                .username {
                    // margin: 0 20rpx 0 0;
                    font-size: 32rpx;
                }

                .tag {
                    margin: 0 0 0 10rpx;
                }

                .rewardIconBox {
                    margin: 0 0 0 10rpx;

                    .rewardIcon {
                        width: 60rpx;
                        height: 60rpx;
                    }
                }
            }

            .content {
                // letter-spacing:1rpx;
                text-align: justify;
            }

            .miniImages {
                margin: 13rpx 0;

                .img {
                    width: 195rpx;
                    height: 195rpx;
                    margin: 0 10rpx;
                    border-radius: 13rpx;
                }
            }

            .bottom {
                flex-direction: row-reverse;

                view {
                    margin: 0 10rpx;
                }

                height: 90rpx;

            }
        }


        .addHb {
            width: 100rpx;
            height: 100rpx;
            display: block;
            position: fixed;
            right: 35rpx;
            bottom: 150rpx;
            z-index: 10;
            border-radius: 100%;
            border: 1rpx solid #F1F1F1;
            box-shadow: 7rpx 7rpx 5rpx #F1F1F1;
        }
        .sign {
            width: 100rpx;
            height: 100rpx;
            display: block;
            position: fixed;
            right: 35rpx;
            bottom: 280rpx;
            z-index: 10;
            border-radius: 100%;
            border: 1rpx solid #F1F1F1;
            box-shadow: 7rpx 7rpx 5rpx #F1F1F1;
            background-color: white;
        }


    }
</style>
