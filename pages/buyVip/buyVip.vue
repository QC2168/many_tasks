<template>
	<view class="buyVip" v-if="goods.length!==0">
        <view class="vip">
     <!--       <view class="u-f-ajc current">
                您当前当前等级&nbsp;VIP
            </view> -->
            <view class="item" v-for="(list,index) in goods" :key="index" @tap="currentIndex=index" :class="{'active':currentIndex===index}">
                <view v-for="(item,index) in list" :key="index"><view>{{index}}</view><view>{{item}}</view></view>
            </view>
            <!-- 开通 -->
            <view class="btn u-f-ajc">
                <u-button @tap="buy" type="primary" size="medium">马上开通  享受特权</u-button>
            </view>
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
                currentIndex:0,
                    goods:[

                    ],
			};
		},
        methods:{
            // 获取vip列表
            async getGoods(){
                await this.$u.post('/get_privileged_goods').then(res=>{
                    this.goods = res.data.map(o=>{return{
                        '特性等级':o.level, 
                        '提现手续费':o.out*100+'%',
                        '发布悬赏任务技术服务费':o.push_task+'元',
                        '发布抖音任务技术服务费':o.push_dy_task+'元',
                        '开通时长':o.term+'天',
                        '开通价格':o.price+'元',
                        '开通条件':'粉丝达到'+o.fans+'位',
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
                             uni.switchTab({
                                 url:"../profile/profile"
                             })
                         },2000)
                        
                  })
             }
        },
  
	}
</script>

<style lang="scss" scoped>
.buyVip{
    .vip{
        .current{
            font-size: 30rpx;
            height: 90rpx;
            font-weight: bold;
        }
        .item{
            border-radius: 10rpx;
            border:5rpx solid #CCCCCC;
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
        .active{
            border: 5rpx solid red;
        }
        .btn{
            height: 100rpx;
        }
    }

}
</style>
