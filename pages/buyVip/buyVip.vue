<template>
	<view class="buyVip" v-if="goods.length!==0">
        <view class="u-f-ajc current">
            当前等级&nbsp;VIP
        </view>
        <view v-if="currentIndex===index" class="item" v-for="(list,index) in goods" :key="index">
            <view v-for="(item,index) in list" :key="index"><view>{{index}}</view><view>{{item}}</view></view>
        </view>
        <view class="selectbox u-f">
            <view @tap="currentIndex=index" v-for="(item,index) in viplist" :key="index" :class="[index===currentIndex?'active u-f-ajc '+item:'u-f-ajc '+item]">{{item}}</view>
        </view>
        <!-- 开通 -->
        <view class="btn u-f-ajc">
            <u-button @tap="buy" type="primary" size="medium">马上开通</u-button>
        </view>
	</view>
</template>

<script>
	export default {
        created(){
           this.getGoods()
        },
		data() {
			return {
                    viplist:['VIP','SVIP','SSVIP'],
                    currentIndex:0,
                    goods:[

                    ]
			};
		},
        methods:{
            // 获取vip列表
            async getGoods(){
                await this.$u.post('/get_privileged_goods').then(res=>{
                    this.goods = res.data.map(o=>{return{
                        '特性等级':o.level, 
                        '提现手续费':o.out+'元',
                        '发布悬赏任务技术服务费':o.push_task+'元',
                        '发布抖音任务技术服务费':o.push_dy_task+'元',
                        '开通时长':o.term+'天',
                        '开通价格':o.price+'元',
                        }});
                    });
               
                
            },
            // 购买vip
            async buy(){
                  await this.$u.post('/buy_privileged_goods',{
                      type:this.currentIndex+1
                  }).then(res=>{
                         uni.showToast({
                             title:"购买成功",
                         })
                         setTimeout(()=>{
                             uni.navigateBack({
                                 delta:1
                             })
                         },2000)
                        
                  })
             }
        },
  
	}
</script>

<style lang="scss" scoped>
.buyVip{
    .current{
        font-size: 30rpx;
        height: 90rpx;
        font-weight: bold;
    }
    .item{
        border-radius: 10rpx;
        border:1rpx solid #CCCCCC;
        margin: 20rpx auto;
        width: 90%;
        height: auto;
        padding: 20rpx;
        font-size: 30rpx;
        view{
            display: flex;
            justify-content: space-between;
            margin: 1rpx 0;
        }
        
    }
    .selectbox{
        view{
            width: 25%;
            height: 200rpx;
            border-radius: 10rpx;
            border: 1rpx solid #d9d9d9;
            margin: 0 auto;
            font-size: 40rpx;
            font-weight: bold;
           
        }
        .VIP{
            color: #ff4d41;
        }
        .SVIP{
            color: #ffa143;
        }
        .SSVIP{
             color: #ffe137;
        }
        .active{
            border: 5rpx solid #ef0000;
            box-shadow: 3rpx 3rpx 3rpx #d1d1d1;
        }
    }
    .btn{
        height: 150rpx;
    }
}
</style>
