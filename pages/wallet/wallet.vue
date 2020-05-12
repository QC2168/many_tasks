<template>
    <view class="wallet" v-if="data">

        <view class="mywallet u-f-ajc">
            <view>
                <view class="u-f-ajc a">账户总金额</view>
                
                <view class="u-f-ajc a">{{data.wallet}}元</view>
                <view class="u-f-ajc bind">已绑定支付宝账户 {{bind}}</view>
            </view>



        </view>
        <view class="whiteBox">
            <view class="inpBox u-f-ajc">
                                <input type="text" placeholder="请输入充值卡密 / 提现金额" v-model="number" />
            </view>
            
            <view class="out u-f-ajc">
                <u-button @tap="out" type="primary" plain shape="square" size="medium">一键提现</u-button>
                <u-button @tap="recharge" type="primary" plain shape="square" size="medium">一键充值</u-button>
            </view>
            <view class="u-f-ajc" style="color: red;font-size: 20rpx;font-weight: bold;height: 50rpx;">当前提现手续费 {{outServePrice}}</view>
            <u-divider fontSize="25" height="90">历史提现记录</u-divider>
            <view>
                <view>
                                <scroll-view scroll-y="true" class="scroll-Y">
   <template v-if="outList.length!==0">
                    <view class="outListItme" v-for="(item,index) in outList" :key="index">
                        <view class="left">
                            <view>
                                <view>提现订单：{{item.orderSn}}</view>
                                    <view>订单状态：<u-tag size="mini" shape="circle" :text="outTypeValue(item.status)" :type="outTagType(item.status)" /></view>
                                     <view>发生时间：{{item.create_time}}</view>
                                
                            </view>
                        </view>
                        <view class="right u-f-ajc">
                            {{item.amount}}
                        </view>
                      
                    </view>
                </template>
                <template v-else>
                    <u-empty text="无提现记录,马上提现一笔吧!" mode="history"></u-empty>
                </template>
                                </scroll-view>
                            </view>
             

            </view>
        </view>
    </view>
</template>

<script>
    export default {
        created() {
            
            this.getData()
        },
        data() {
            return {
                number:'',
                data: [],
                bind:"获取中...",
                outList:[],
                outServePrice:0
            };
        },
        methods: {
            outTypeValue(value){
                switch (value) {
                    case 0:
                        return "未处理";
                    case 1:
                        return "已处理";
                    case 2:
                        return "异常";
                    default:
                        return "未知"
                }
            },
            outTagType(value){
                switch (value) {
                    case 0:
                        return "info";
                    case 1:
                        return "success";
                    case 2:
                        return "error";
                    default:
                        return "info"
                }
            },
            async getData() {
                // 任务列表
                await this.$u.get('/get_assets').then(
                    res => {
                        if (res.errorCode !== 0) return;
                        this.data = res.data['assets'];
                        // this.number = res.data['assets'].wallet;
                        this.bind=res.data['bind'];
                    }
                )
                // 请求列表
                await this.$u.get('/get_out_order').then(res=>{
                    if(res.errorCode!==0) return;
                    this.outList=res.data;
                })
                // 服务费
                await this.$u.get('/get_serve_price',{name:'out'}).then(res=>this.outServePrice=(Math.min(res.data,1) * 100).toFixed(0)+'%');
                
            },
            async out() {
                if(this.$u.test.empty(this.number)){
                   uni.showToast({
                       title: "请输入提现金额",
                       icon: 'none'
                   })
                   return; 
                }
                if(!(this.$u.test.digits(this.number))){
                   uni.showToast({
                       title: "请输入正确的提现金额",
                       icon: 'none'
                   })
                   return; 
                }
                if(this.number>this.data.wallet){
                   uni.showToast({
                       title: "余额不足提现",
                       icon: 'none'
                   })
                   return; 
                }
                if ((this.number % 10) != 0 || this.number == 0) {
                    uni.showToast({
                        title: "提现金额必须为10倍",
                        icon: 'none'
                    })
                    return;
                }
                // 请求提现
                await this.$u.post('/post_out_order', {
                    amount: this.number
                }).then(res => {
                    {
                        if (res.errorCode !== 0) return;
                        uni.showToast({
                            title: res.msg,
                            icon: 'none'
                        })
                        return;
                    }
                })


            },
            async recharge() {
                if(this.number.length!==32){
                    uni.showToast({
                        title: "卡密格式不正确",
                        icon: 'none'
                    })
                    return;
                }
                // 请求充值
            await this.$u.post('/recharge',{'cKey':this.number}).then(res=>{
                 if(res.errorCode!==0)return;
                 uni.showToast({
                     title: res.msg,
                     icon: 'none'
                 })
             })
            
            
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wallet {
        .zfbLogo {
            image {
                width: 200rpx;
                height: 120rpx;
            }
        }

        .mywallet {
            width: 100%;
            height: 300rpx;
            background-color: #0099e5;
            box-shadow: 1rpx 1rpx 8rpx #888888;

            .a {
                font-size: 33rpx;
                font-weight: bold;

            }

            .bind {
                font-size: 25rpx;
                color: #eeeeee;
                margin: 15rpx 0;
            }
        }

        .whiteBox {
            padding-top: 50rpx;
            position: absolute;
            // z-index: 100;
            top: 240rpx;
            width: 100%;
            height: 400rpx;
            background-color: white;
            border-top-left-radius: 50rpx;
            border-top-right-radius: 50rpx;
            //input 
            .inpBox{
                
                input{
                    border-bottom: 1rpx solid #eeeeee;
                    text-align: center;
                    font-size: 35rpx;
                    width: 450rpx;
                }
            }
            // 提现按钮
            .out {
                width: 100%;
                height: 120rpx;
            }
            .scroll-Y{
                height: 820rpx;
            
            .outListItme{
                display: flex;
                margin: 15rpx 0;
                height: 140rpx;
                box-shadow:5rpx 5rpx 5rpx #eeeeee;
                .left{
                    display: flex;
                    align-items: center;
                    padding-left:30rpx;
                    font-size: 25rpx;
                    flex: 1;
                    view{
                        margin: 4rpx;
                    }
                }
                .right{
                    width: 140rpx;
                    color: #52eb6b;
                    // background-color: #52eb6b;
                    font-size: 40rpx;
                    font-weight: bold;
                }
            }}
        }

       
    }
</style>
