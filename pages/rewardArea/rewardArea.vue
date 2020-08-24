<template>
    <view class="rewardArea">
        <u-modal v-model="updateModal" @confirm="downloadApp" show-cancel-button :content="updateModalContent"></u-modal>
        <u-notice-bar v-if="noticeList.length" mode="vertical" :list="noticeList"></u-notice-bar>
        <view class="wrap">
            <u-swiper img-mode="widthFix" indicator-pos="bottomRight" name="img_url" :list="swiperlist"></u-swiper>
        </view>
        <rewardPanl v-for="(item,index) in hbList" :key="item.hb_id" :item="item"></rewardPanl>
        <!-- 添加红包 -->
        <image @tap="addHb" src="../../static/images/rewardArea/addHb.png" class="addHb" mode="widthFix"></image>
        <image @tap="sign" src="../../static/images/rewardArea/sign.png" class="sign" mode="widthFix"></image>

    </view>
</template>

<script>
    import space from "../../components/space/space.vue"
    import rewardPanl from "./childComponents/rewardPanl.vue"
    export default {
        components: {
            space,
            rewardPanl
        },
        onLoad() {
            uni.$on('toHbDetail', (e) => this.toDetail(e.hb_id))
        },
        onUnload() {
            uni.$off('toHbDetail')
        },
        created() {

            this.getData();
            // #ifdef H5
            this.getDownloadAppAddress()
            // #endif

            // 获取消息
            this.$u.get('/get_message').then(res => {
                if (res.data === null || res.data === '') return;
                uni.showModal({
                    content: res.data,
                    title: "消息",
                    showCancel: false,
                    complete() {
                        // 查看是否显示说明
                        const use = uni.getStorageSync('use');
                        if (use != 1) {
                            uni.showModal({
                                showCancel: false,
                                title: '如何获得更多人脉',
                                content: '点击右侧 + 号图标，免费发布广告（例如：您的产品广告、微信二维码 等广告信息），获得红包奖励，邀请也有红包奖励！',
                                confirmText: "知道了，不再提示",
                                success: (model) => {
                                    if (model.confirm) {
                                        uni.setStorageSync('use', '1');
                                    }
                                },

                            });
                        }
                    }
                })
            })





        },
        data() {
            return {
                updateModal: false,
                appAddress: '',
                updateModalContent: 'APP版本现已推出，是否马上下载~',
                URL: getApp().globalData.URL,
                noticeList: [],
                hbList: [],
                swiperlist: [],
                // page index
                index: 1,
                // last_page
                last_page: 1,
                //#ifdef APP-PLUS
                v: plus.runtime.version
                //#endif
            };
        },
        onReachBottom() {
            // 到底刷新
            // 获取下一页
            this.getNextData()
        },
        onPullDownRefresh() {
            this.getData();
            this.index = 1
            this.last_page = 1
        },
        methods: {
            async getDownloadAppAddress() {
                await this.$u.post('/updateV', {
                    v: this.v
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
            sign() {
                this.$u.route('pages/sign/sign')
            },
            toDetail(hb_id) {
                this.$u.route('/pages/rewardDetail/rewardDetail', {
                    hb_id
                });
            },
            async getNextData() {
                if (this.index < this.last_page) {
                    this.index++;
                    // 获取红包列表
                    await this.$u.get('/get_hb_area_list', {
                        index: this.index
                    }).then(res => {
                        this.hbList = [...this.hbList, ...res.data.data];
                    })
                }


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
                    this.hbList = res.data.data;
                    this.last_page = res.data.last_page
                    uni.stopPullDownRefresh()
                })

                // 获取轮播图
                await this.$u.get('/get_home_pic').then(
                    res => {
                        if (res.errorCode !== 0) return;
                        //给url加上前缀
                        for (let i of res.data) {
                            // 判断是不是网络图片
                            if (!this.$u.test.url(i.img_url)) i.img_url = this.URL + i.img_url;
                        }
                        this.swiperlist = res.data
                    })
            }
        },

    }
</script>

<style lang="scss">
    .rewardArea {
        .wrap {
            padding: 3%;
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
