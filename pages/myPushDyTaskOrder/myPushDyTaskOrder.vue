<template>
    <view class="myTaskOrder">
        <scroll-view :style="{'height':windowHeight+'px'}" scroll-y="true" class="scroll-Y"></scroll-view>
<template v-if="orderList.length!==0">
    <view class="item u-f-ajc" v-for="(item,index) in orderList" :key="index">
        <view class="box" v-if="item">
            <view class="line">
                <view>任务订单</view>
                <view>{{item.orderSn}}</view>
            </view>
            <view class="line">
                <view>任务状态</view>
                <view>{{item.status|dyTaskOrder}}</view>
            </view>
            <view class="line">
                <view>申请时间</view>
                <view>{{item.create_time}}</view>
            </view>
            <view v-if="item.status===0" @tap="openImage(item.orderSn)" class="btn u-f-ajc">
                <view>查看图片</view>
            </view>
            <view v-if="item.status===0" class="btns u-f">
                <view class="yes u-f-ajc" @tap="changeStatus(1,item.orderSn)">通过</view>
                 <view class="no u-f-ajc" @tap="changeStatus(2,item.orderSn)">不合格</view>
            </view>
        </view>
    
    </view>
</template>
       <template v-else>
         <u-empty text="暂无该任务订单" mode="order"></u-empty>
       </template> 
               
    </view>
</template>

<script>
    export default {
        onLoad:function(res){
            // 请求订单
           this.dy_task_id=res.dy_task_id
            this.getData(this.dy_task_id)
        },
        created() {
            //计算滚动高度
            uni.getSystemInfo({
                success: function (res) {
                    this.windowHeight=res.windowHeight;
                }
            });
        },
        data() {
            return {
                dy_task_id:null,
                orderList: [],
                // 滚动条高度
                windowHeight:0,
                URL:getApp().globalData.URL,
            };
        },
        methods: {
            async changeStatus(status,orderSn){
                this.$u.post('/change_dy_order_status',{status,orderSn}).then(res=>{
                    if(res.errorCode!==0)return;
                    uni.showToast({
                        title:res.msg
                    })
                    this.getData(this.dy_task_id);
                })
            },
            async getData(dy_task_id) {
                await this.$u.get('/my_push_dy_task_order',{'dy_task_id_select':dy_task_id}).then(res=>{
                    if(res.errorCode===0){
                       this.orderList = res.data
                    }
                })
            },
            async openImage(orderSn) {
                await this.$u.post('/select_dy_order_pic', {
                    orderSn
                }).then(res => {
                    let urls = []
                    for (let i of res.data) {
                        urls.push(this.URL + i.pic)
                    }
                    uni.previewImage({
                        urls
                    })
                })
            
            },
        }
    }
</script>

<style lang="scss" scoped>
    .myTaskOrder {
        .item {
            height: auto;
            margin: 20rpx 0;

            .box {
                border: 3rpx solid black;
                width: 700rpx;
                padding: 10rpx 30rpx;
                border-radius: 10rpx;
            
                .line {
                    display: flex;
                    justify-content: space-between;
                    margin: 4rpx 0;
                    font-size: 28rpx;


                }

                .btn {
                    margin: 15rpx 0;
                    background-color: #3183ff;
                    border-radius: 80rpx;
                    // width: 100%;
                    height: 60rpx;
                    font-size: 25rpx;
                    color: white;
                     box-shadow: 5rpx 5rpx 5rpx #EEEEEE;
                }
                .btns {
                    margin: 15rpx 0;
                    border-radius: 80rpx;
                    height: 60rpx;
                    font-size: 25rpx;
                    color: white;
                    .yes,.no{
                        flex:1;
                        border-radius: 80rpx;
                        margin: 0 10rpx;
                        box-shadow: 5rpx 5rpx 5rpx #EEEEEE;
                    }
                    .yes{
                        background-color: #00e200;
                    }
                    .no{
                        background-color: #ff0000;
                    }
                }
            }


        }
    }
</style>
