<template>
    <view class="home">
        <u-notice-bar v-if="noticeList.length" mode="horizontal" :list="noticeList"></u-notice-bar>
        <view class="wrap">
            <u-swiper name="img_url" :list="swiperlist"></u-swiper>
        </view>
        <!-- 任务模块 -->
        <view class="taskmodel u-f">
            <view @tap="to('shortVideo')">
                <image src="../../static/images/home/video.png" mode="aspectFit"></image>视频赚米
            </view>
            <view @tap="to('film')">
                <image src="../../static/images/home/film.png" mode="aspectFit"></image>电影代理
            </view>
            <view @tap="to('cart')">
                <image src="../../static/images/home/cart.png" mode="aspectFit"></image>购物赚钱
            </view>
            <view @tap="to('game')">
                <image src="../../static/images/home/game.png" mode="aspectFit"></image>游戏赚钱
            </view>
        </view>
        <tabs ref="tabs" @changeTabIndex="changeTabIndex" :list="['视频红包','悬赏红包']"></tabs>
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper :style="{height:navHeight+'px'}" class="swiper" :current="taskType" @change="swiperChange">

                        <swiper-item>
                            <scroll-view scroll-y :style="{height:navHeight+'px'}" scroll-with-animation class="scroll-Y">
                                <view class="tasklist">
                                    <view class="item animated fadeInUp" v-for="(item,index) in dytasklist" :key="index">
                                        <view class="left u-f-ajc">
                                            <image :src="URL+item.dy_task_pic" mode="aspectFill"></image>
                                        </view>
                                        <view class="center">
                                            <view>{{item.title}}</view>
                                            <view>佣金：{{item.price}}</view>
                                        </view>
                                        <view class="right u-f-ajc">
                                            <u-button @tap="openDyTaskDetail(item.dy_task_id)" type="warning" size="mini"
                                                shape="circle">查看任务</u-button>
                                        </view>
                                    </view>

                                </view>
                            </scroll-view>

                        </swiper-item>
                        <swiper-item>
                             <scroll-view scroll-y :style="{height:navHeight+'px'}" class="scroll-Y">
                            <view class="tasklist">
                                <view class="item animated fadeInUp" v-for="(item,index) in tasklist" :key="index">
                                    <view class="left u-f-ajc">
                                        <image :src="URL+item.pic" mode="aspectFill"></image>
                                    </view>
                                    <view class="center">
                                        <view>{{item.title}}</view>
                                        <view>佣金：{{item.price}}</view>
                                    </view>
                                    <view class="right u-f-ajc">
                                        <u-button @tap="openTaskDetail(item.task_id)" type="warning" size="mini" shape="circle">查看任务</u-button>
                                    </view>
                                </view>

                            </view>
                            </scroll-view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
        <!-- 任务列表 -->
        <!-- <template v-if="taskType===0">
               <view class="tasklist">
                   <view class="item animated fadeInUp" v-for="(item,index) in dytasklist" :key="index">
                       <view class="left u-f-ajc">
                           <image :src="URL+item.dy_task_pic" mode="aspectFill"></image>
                       </view>
                       <view class="center">
                           <view>{{item.title}}</view>
                           <view>佣金：{{item.price}}</view>
                       </view>
                       <view class="right u-f-ajc">
                           <u-button @tap="openDyTaskDetail(item.dy_task_id)" type="warning" size="mini" shape="circle">查看任务</u-button>
                       </view>
                   </view>
               
               </view>
           </template> -->
        <!-- <template v-if="taskType===1">
         <view class="tasklist">
             <view class="item animated fadeInUp" v-for="(item,index) in tasklist" :key="index">
                 <view class="left u-f-ajc">
                     <image :src="URL+item.pic" mode="aspectFill"></image>
                 </view>
                 <view class="center">
                     <view>{{item.title}}</view>
                     <view>佣金：{{item.price}}</view>
                 </view>
                 <view class="right u-f-ajc">
                     <u-button @tap="openTaskDetail(item.task_id)" type="warning" size="mini" shape="circle">查看任务</u-button>
                 </view>
             </view>
         
         </view>
        </template> -->


        <!-- 到底了 -->
        <!-- <u-divider>先完成一个任务后再查看吧！</u-divider> -->
    </view>
</template>

<script>
    import tabs from "../../components/common/tabs/tabs.vue";
    export default {
        onReady() {
            
            
        },
        components: {
            tabs
        },
        onPullDownRefresh() {
            // #ifdef  APP-PLUS
            plus.nativeUI.toast("任务资源刷新中...");
            // #endif
            this.getData()
        },
        created() {
     
            //没token  跳登录去
            uni.getStorage({
                key: 'token',
                success: function(res) {
                    const token = res.data
                    if (!token) {
                        // 没有token 滚去login
                        uni.navigateTo({
                            url: "../login/login"
                        })
                        return;
                    };
                    if (token) {
                        //查询是否存在
                    }
                }
            });
            this.getData()
        },
        data() {
            return {
                URL: getApp().globalData.URL,
                tasklist: [],
                dytasklist: [],
                swiperlist: [],
                noticeList: [],
                pH:0, //窗口高度
                		navHeight:0, //元素的所需高度
                taskType: 0,
                //#ifdef APP-PLUS
                v: plus.runtime.version
                //#endif


            }
        },
        methods: {
            // async checkVersion() {
            //     //版本判断
            //     await this.$u.post('/check_version', {
            //         v
            //     }).then(res => {

            //     })
            // },

            // tabs 监听
            changeTabIndex(index) {
                // 0 抖音  1 普通任务
                this.taskType = index;
            },
            to(page) {
                uni.showToast({
                    title: "即将开放",
                    icon: 'none'
                })
                // uni.navigateTo({
                //     url:`../${page}/${page}`
                // })
            },
            async getData() {
            
                // 任务列表
                await this.$u.get('/get_task_list').then(
                    res => {
                        if (res.errorCode !== 0) return;
                        let taskData =res.data.map((item) =>{
                                 item.price=parseFloat(item.price);
                         return item;
                        })
                           this.tasklist=_.orderBy(taskData,['price'], ['desc'])
                    }
                )
                // 抖音任务列表
                await this.$u.get('/get_dy_task_list').then(
                    res => {
                        if (res.errorCode !== 0) return;
                      
                         let dyTaskData =res.data.map((item) =>{
                       
                             item.price=parseFloat(item.price);
                        return item;
                       })
                          this.dytasklist=_.orderBy(dyTaskData,['price'], ['desc'])
                    }
                )
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

                // 获取notic
                await this.$u.get('/get_notice_bar').then(res => {
                    if (res.errorCode !== 0) return;
                   this.noticeList=[];
               this.noticeList.push(res.data)
    
                    uni.stopPullDownRefresh()
                })
              await this.setScrollHeight()
            },
            openTaskDetail(task_id) {
                this.$u.route('pages/taskDetail/taskDetail', {
                    task_id
                });
            },

            openDyTaskDetail(dy_task_id) {
                this.$u.route('pages/douyinDetail/douyinDetail', {
                    dy_task_id
                });

            },
            swiperChange(e) {
                this.taskType = e.detail.current;
                this.$refs.tabs.setCurrentIndex(e.detail.current);
            },
            setScrollHeight(){
                uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
                    success: (res) => { //成功回调函数
                        this.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
                        let titleH = uni.createSelectorQuery().select(".scroll-Y"); //想要获取高度的元素名（class/id）
                        titleH.boundingClientRect(data => {
                            let pH = this.pH;
                            this.navHeight = pH - data.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
                        }).exec()
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .home {
        .wrap {
            padding: 20rpx;
        }

        .taskmodel {
            height: 100rpx;

            view {
                flex: 1;
                width: 80rpx;
                height: 80rpx;
                display: flex;
                flex-direction: column;
                text-align: center;
                font-size: 22rpx;

                image {
                    margin: 0 auto;
                    width: 80rpx;
                    height: 80rpx;
                }
            }
        }

        .swiper {
            .scroll-Y {
                .tasklist {
                    width: 100%;
                    display: flex;
                    flex-direction: column;

                    .item {
                        margin: 0 auto 15rpx auto;
                        border-radius: 15rpx;
                        border: .4rpx solid black;
                        box-shadow: 4rpx 4rpx 8rpx #EEEEEE;
                        width: 90%;
                        height: 120rpx;
                        padding: 10rpx;
                        display: flex;

                        .left {
                            width: 100rpx;

                            image {
                                width: 80rpx;
                                height: 80rpx;
                                border-radius: 8rpx;
                            }
                        }

                        .center {
                            flex: 1;
                            padding-left: 10rpx;

                            view {
                                font-size: 30rpx;
                            }
                        }

                        .right {
                            width: 150rpx;
                        }
                    }
                }
            }
        }
    }
</style>
