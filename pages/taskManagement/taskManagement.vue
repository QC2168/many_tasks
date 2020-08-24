<template>
    <view class="taskManagement">
         <tabs @changeTabIndex="changeTabIndex" :list="['视频任务','悬赏任务','福利红包']"></tabs>
         <template v-if="taskType===0">
             <template v-if="dytaskList.length!==0">
                 <view class="item animated fadeInUp" v-for="(item,index) in dytaskList" :key="index">
                     <view class="Detail u-f">
                         <view class="pic u-f-ajc">
                             <image :src="URL+item.dy_task_pic" mode="aspectFill"></image>
                         </view>
                         <view class="line">
                             <view>任务标题:  {{item.title}}</view>
                             <view>任务金币:  {{item.price}}</view>
                             <view>剩下名额:  {{item.remaining_quota}} / {{item.quota}}</view>
                             <view>创建时间:  {{item.create_time}}</view>
                             <view>任务状态:  {{item.show|taskStatus}}</view>
                         </view>
                     </view>
                     <view class="btn u-f-ajc">
                         <view class="open u-f-ajc" @tap="open(item.dy_task_id,1)">查看</view>
                         <view class="del u-f-ajc" @tap="del(item.dy_task_id,1)">下架</view>
                     </view>
                 </view>
             </template>
             <template v-else>
                 <u-empty text="快去发布点赞任务吧" mode="order"></u-empty>
             </template>
         </template>
        <template v-if="taskType===1">
            <template v-if="taskList.length!==0">
                <view class="item animated fadeInUp" v-for="(item,index) in taskList" :key="index">
                    <view class="Detail u-f">
                        <view class="pic u-f-ajc">
                            <image :src="URL+item.pic" mode="aspectFill"></image>
                        </view>
                        <view class="line">
                            <view>任务标题:  {{item.title}}</view>
                            <view>任务金币:  {{item.price}}</view>
                            <view>剩下名额:  {{item.remaining_quota}} / {{item.quota}}</view>
                            <view>创建时间:  {{item.create_time}}</view>
                            <view>任务状态:  {{item.show|taskStatus}}</view>
                        </view>
                    </view>
                    <view class="btn u-f-ajc">
                        <view class="open u-f-ajc" @tap="open(item.task_id,2)">查看</view>
                        <view class="del u-f-ajc" @tap="del(item.task_id,2)">下架</view>
                    </view>
                </view>
            </template>
            <template v-else>
                <u-empty text="快去发布悬赏任务吧" mode="order"></u-empty>
            </template>
        </template>
        <template v-if="taskType===2">
            <template v-if="hbList.length!==0">
                <view class="item animated fadeInUp" v-for="(item,index) in hbList" :key="index">
                    <view class="Detail u-f">
                      <view class="pic u-f-ajc">
                            <image :src="URL+item.user.user_pic" mode="aspectFill"></image>
                        </view>
                        <view class="line">
                            <view>红包类型:  {{item.hb_amount==0?"免费红包":"付费红包"}}</view>
                            <view>红包名额:  {{item.remaining_quota}} / {{item.quota}}</view>
                            <view>红包余额:  {{item.remaining_hb_amount}} / {{item.hb_amount}}</view>
                            <view>置顶状态:  {{item.priority>0?"置顶中":"未置顶"}}</view>
                            <view>创建时间:  {{item.create_time}}</view>
                            <!-- <view>状态:  {{item.show|taskStatus?}}</view> -->
                        </view>
                    </view>
                    <view class="btn u-f-ajc">
                        <view class="open u-f-ajc" @tap="open(item.hb_id,3)">查看</view>
                        <view class="top u-f-ajc" @tap="top(item.hb_id)">置顶</view> 
                        <view class="del u-f-ajc" @tap="del(item.hb_id,3)">下架</view>
                    </view>
                </view>
            </template>
            <template v-else>
                <u-empty text="快去发布红包吧" mode="order"></u-empty>
            </template>
        </template>
       	<u-action-sheet :list="topPriceList"  @click="buyTop" v-model="topPriceListFlag"></u-action-sheet>

    </view>
</template>

<script>
    import tabs from "../../components/common/tabs/tabs.vue";
    export default {
        components:{
            tabs
        },
        created() {
            this.getData()
        },
        data() {
            return {
                taskType:0,
                currentHbId:0,
                dytaskList: [],
                taskList: [],
                hbList: [],
                URL:getApp().globalData.URL,
                topPriceListFlag:false,
                topPriceList: [],
            };
        },
        methods: {
            // tabs 监听
            changeTabIndex(index){
                // 0 抖音  1 普通任务
                this.taskType=index;
            },
            async getData() {
                await this.$u.get('/my_push_dy_task').then(res => {
                    this.dytaskList = res.data
                })
                await this.$u.get('/my_push_task').then(res => {
                    this.taskList = res.data
                })
                await this.$u.get('/my_Hb').then(res => {
                    this.hbList = res.data
                })
                // 红包置顶数据
                await this.$u.get('/get_hb_top_list').then(res => {
                                 this.topPriceList=res.data
                })
            },
            del(id,type){
                uni.showModal({
                        title:"提示",
                        content:"确认下架？",
                        cancelText:"继续展示",
                        confirmText:"下架",
                        success:(res)=>{
                            if(res.confirm){
                                // dy
                                if(type===1){
                                    this.$u.post('/delete_dy_task',{dy_task_id:id}).then(res=>{
                                        if(res.errorCode===0){
                                            uni.showToast({
                                                title:"下架成功"
                                            })
                                        }
                                        this.getData()
                                    })
                                }
                                //悬赏
                                if(type===2){
                                this.$u.post('/delete_task',{task_id:id}).then(res=>{
                                    if(res.errorCode===0){
                                        uni.showToast({
                                            title:"下架成功"
                                        })
                                    }
                                    this.getData()
                                })
                            }
                              // 红包
                            if(type===3){
                                this.$u.post('/delete_hb',{hb_id:id}).then(res=>{
                                    if(res.errorCode===0){
                                        uni.showToast({
                                            title:"下架成功"
                                        })
                                    }
                                    this.getData()
                                })
                            }}
                            }
                          
                      
                    })
                

            },
            
            top(hb_id){
                this.currentHbId=hb_id;
               // 查看是否显示说明
               const V = uni.getStorageSync('V');
               if(V==0){
                   uni.showToast({
                       title:"请先开通会员",
                       icon:"none"
                   })
               }else{
                   this.topPriceListFlag=true
               }
            },
            buyTop(index){
                let top_id=this.topPriceList[index].top_id
                this.$u.post('/top_hb',{
                    hb_id:this.currentHbId,
                    top_id}).then(res=>{
                        uni.showToast({
                            title:res.msg
                        })
                    this.getData()
                })
            },
            open(id,type){
                if(type===1){
                    this.$u.route('pages/myPushDyTaskOrder/myPushDyTaskOrder', {
                    	dy_task_id:id
                    });
                }
                if(type===2){
                    this.$u.route('pages/myPushTaskOrder/myPushTaskOrder', {
                    	task_id:id
                    });
                }
              if(type===3){
                  this.$u.route('/pages/rewardDetail/rewardDetail', {
                      hb_id:id
                  });
              }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .taskManagement {
        padding: 20rpx;

        .item {
            border: 1rpx solid #fff0f0;
            border-radius: 15rpx;
            height: 300rpx;
            position: relative;
            margin: 15rpx 0;

            .Detail {
                .pic {
                    width: 210rpx;
                    height: 210rpx;

                    image {
                        width: 200rpx;
                        height: 200rpx;
                        border-radius: 10rpx;
                    }
                }

                .line {
                    font-size: 24rpx;
                    view {
                        margin:10rpx
                    }
                }
            }

            .btn {
                height: 80rpx;
                width: 100%;
                position: absolute;
                bottom: 0;
                box-shadow: 5rpx 5rpx -5rpx #EEEEEE;
  font-size: 30rpx;
                .open,
                .top,
                .del {
                    box-shadow: 5rpx 5rpx -5rpx #EEEEEE;
                    height: 80rpx;
                    flex: 1;
                }

                .open {
                    background-color: #e5d412;
                    border-bottom-left-radius: 15rpx;
                    color: black;
                }
                .top {
                    background-color: #10a0ff;
                    color: black;
                }

                .del {
                    background-color: #e56767;
                    color: white;
                    border-bottom-right-radius: 15rpx;
                }
            }
        }
    }
</style>
