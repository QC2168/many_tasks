<template>
    <view class="home">
        <u-notice-bar v-if="noticeList.length" mode="horizontal" :list="noticeList"></u-notice-bar>
        <view class="wrap">
            <u-swiper name="img_url" :list="swiperlist"></u-swiper>
        </view>
        <!-- 任务模块 -->
        <view class="taskmodel u-f">
<view @tap="to('shortVideo')"><image src="../../static/images/home/video.png" mode="aspectFit"></image>视频赚米</view>
<view @tap="to('film')"><image src="../../static/images/home/film.png" mode="aspectFit"></image>电影代理</view>
<view @tap="to('cart')"><image src="../../static/images/home/cart.png" mode="aspectFit"></image>购物赚钱</view>
<view @tap="to('game')"><image src="../../static/images/home/game.png" mode="aspectFit"></image>游戏赚钱</view>
        </view>
        <home-tabs @changeTabIndex="changeTabIndex" :list="['点赞任务','悬赏任务']"></home-tabs>
        <!-- 任务列表 -->
        <template v-if="taskType===0">
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
                           <u-button @tap="openDyTaskDetail(item.dy_task_id)" type="warning" size="mini" shape="circle">点赞任务</u-button>
                       </view>
                   </view>
               
               </view>
           </template>
        <template v-if="taskType===1">
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
        </template>
     
        
        <!-- 到底了 -->
        <!-- <u-divider>先完成一个任务后再查看吧！</u-divider> -->
    </view>
</template>

<script>
    import homeTabs from "../../components/common/tabs/homeTabs.vue";
    export default {
        components:{
            homeTabs
        },
        created() {
            //没token  跳登录去
            uni.getStorage({
                key: 'token',
                success: function (res) {
                    const token =res.data
                    if(!token){
                        // 没有token
                        // 滚去login
                        uni.navigateTo({
                            url:"../login/login"
                        })
                        return;
                    };
                    if(token){
                        //查询是否存在
                    }
                }
            });
            this.getData()
        },
        data() {
            return {
                URL:getApp().globalData.URL,
                tasklist:[],
                dytasklist:[],
                swiperlist: [],
                noticeList:[],
                taskType:0
                
            }
        },
        methods: {
            // tabs 监听
            changeTabIndex(index){
                // 0 抖音  1 普通任务
                this.taskType=index;
            },
            to(page) {
                uni.showToast({
                    title:"即将开放",
                    icon:'none'
                })
                // uni.navigateTo({
                //             url: `../${page}/${page}`
                //         })
            },
            async getData() {
                // 任务列表
                await this.$u.get('/get_task_list').then(
                    res => {
                        if (res.errorCode !== 0) return;
                          this.tasklist=res.data
                    }
                )
                // 抖音任务列表
                await this.$u.get('/get_dy_task_list').then(
                    res => {
                        if (res.errorCode !== 0) return;
                          this.dytasklist=res.data
                    }
                )
                
                // 获取轮播图
                await this.$u.get('/get_home_pic').then(
                res=>{
                    if (res.errorCode !== 0) return;
                    //给url加上前缀
                    for(let i of res.data){
                        i.img_url=this.URL+i.img_url
                    }
                  this.swiperlist=res.data
                })
                
                // 获取notic
                await this.$u.get('/get_notice_bar').then(res=>{
                     if (res.errorCode !== 0) return;
                     for(let i of res.data){
                       this.noticeList.push(i.content)
                     }
                })
            },
            dy() {
                uni.navigateTo({
                    url: "../douyinDetail/douyinDetail"
                })

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
            view{
                flex:1;
                width: 80rpx;
                height: 80rpx;
                display: flex;
           flex-direction: column;
                text-align: center;
                font-size: 22rpx;
                image{
                     margin: 0 auto;
                    width: 80rpx;
                    height: 80rpx;
                }
            }
        }

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
                height: 110rpx;
                padding: 10rpx;
                display: flex;

                .left {
                    width: 150rpx;

                    image {
                        width: 50rpx;
                        height: 50rpx;
                    }
                }

                .center {
                    flex: 1;

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
</style>
