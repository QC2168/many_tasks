<template>
    <view class="myTaskOrder">
        <tabs @changeTabIndex="changeTabIndex" :list="['视频任务','悬赏任务']"></tabs>
        <template v-if="taskType===0">
            <template v-if="dyOrderList.length!==0">
                <view class="item u-f-ajc animated fadeInUp" v-for="(item,index) in dyOrderList" :key="index">
                    <view class="box">
                        <view class="line">
                            <view>任务名称</view>
                            <view>{{item.dy_task_list[0].title}}</view>
                        </view>
                        <view class="line">
                            <view>任务金币</view>
                            <view>{{item.dy_task_list[0].price}}</view>
                        </view>
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
                    </view>

                </view>
            </template>
            <template v-else>
                <u-empty text="快去申请视频任务吧!" mode="order"></u-empty>
            </template>
        </template>
        <template v-if="taskType===1">
            <template v-if="orderList.length!==0">
                <view class="item u-f-ajc animated fadeInUp" v-for="(item,index) in orderList" :key="index">
                    <view class="box">
                        <view class="line">
                            <view>任务名称</view>
                            <view>{{item.task_list[0].title}}</view>
                        </view>
                        <view class="line">
                            <view>任务金币</view>
                            <view>{{item.task_list[0].price}}</view>
                        </view>
                        <view class="line">
                            <view>任务订单</view>
                            <view>{{item.orderSn}}</view>
                        </view>
                        <view class="line">
                            <view>任务状态</view>
                            <view>{{item.status|taskOrder}}</view>
                        </view>
                        <view class="line">
                            <view>申请时间</view>
                            <view>{{item.create_time}}</view>
                        </view>

                        <view v-if="item.status===4" class="btns u-f">
                            <view class="yes u-f-ajc" @tap="submit(item.orderSn)">提交内容</view>
                            <view class="no u-f-ajc" @tap="changeTaskOrderStatus(3,item.orderSn)">取消报名</view>
                        </view>
                    </view>

                </view>
            </template>
            <template v-else>
                <u-empty text="快去申请悬赏任务吧!" mode="order"></u-empty>
            </template>
        </template>
       
        <!--        <scroll-view :style="{'height':windowHeight+'px'}" scroll-y="true" class="scroll-Y"></scroll-view> -->

    </view>
</template>

<script>
    import tabs from "../../components/common/tabs/tabs.vue";
    export default {
        onLoad(res) {
            // 请求订单数据
                this.getData(res.type)
                // 修改title
                switch(res.type){
                    case "toBeSubmitted":
                    uni.setNavigationBarTitle({
                        title: "待提交的任务订单"
                    });
                    break;
                    case "underReview":
                    uni.setNavigationBarTitle({
                        title: "审核中的任务订单"
                    });
                    break;
                    case "complete":
                    uni.setNavigationBarTitle({
                        title: "已完成的任务订单"
                    });
                    break;
                }

        },
        components: {
            tabs
        },
        created() {
            //计算滚动高度
            uni.getSystemInfo({
                success: function(res) {
                    this.windowHeight = res.windowHeight;
                }
            });
            
        },
        data() {
            return {
                taskType: 0,
                dyOrderList: [],
                orderList: [],
                // 滚动条高度
                windowHeight: 0
            };
        },
        methods: {
            // tabs 监听
            changeTabIndex(index) {
                // 0 抖音  1 普通任务
                this.taskType = index;
            },
            // 传参 表示  待提交  审核中  已完成
            async getData(type) {
                    await this.$u.get('/my_dy_task_order').then(res => {
                        // 0 审核中 1 完成 2 未通过 3 自主取消 4待提交任务
                        if(type==='toBeSubmitted'){
                            this.dyOrderList =res.data.filter(item=>item.status===4)
                        }else if(type==='underReview'){
                           this.dyOrderList =res.data.filter(item=>item.status===0) 
                        } else if(type==='complete'){
                            this.dyOrderList =res.data.filter(item=>item.status===1) 
                        }else{
                            this.dyOrderList = res.data
                        }
                    })
                    await this.$u.get('/my_task_order').then(res => {
                        // 0 审核中 1 完成 2 未通过 3 自主取消 4待提交任务
                        if(type==='toBeSubmitted'){
                            this.orderList =res.data.filter(item=>item.status===4)
                        }else if(type==='underReview'){
                           this.orderList =res.data.filter(item=>item.status===0) 
                        } else if(type==='complete'){
                            this.orderList =res.data.filter(item=>item.status===1) 
                        }else{
                            this.orderList = res.data
                        }
                    })
                
                   
            },
            submit(orderSn) {
                this.$u.route({
                    url: 'pages/placeOrder/placeOrder',
                    params: {
                        orderSn
                    }
                })
            },
            async changeTaskOrderStatus(status, orderSn) {
                await this.$u.post('/change_order_status', {
                    status,
                    orderSn
                }).then(res => {
                    if (res.errorCode !== 0) return;
                    uni.showToast({
                        title: res.msg
                    })
                    this.getData();
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
                    background-color: red;
                    border-radius: 80rpx;
                    // width: 100%;
                    height: 70rpx;
                    font-size: 28rpx;
                    color: white;
                }

                .btns {
                    margin: 15rpx 0;
                    border-radius: 80rpx;
                    height: 60rpx;
                    font-size: 25rpx;
                    color: white;

                    .yes,
                    .no {
                        flex: 1;
                        border-radius: 80rpx;
                        margin: 0 10rpx;
                        box-shadow: 5rpx 5rpx 5rpx #EEEEEE;
                    }

                    .yes {
                        background-color: #ff007f;
                    }

                    .no {
                        background-color: #bebebe;
                    }
                }
            }


        }
    }
</style>
