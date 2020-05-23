<template>
	<view class="walletDetails">
        <template v-if="walletDetail.length!==0">
            <view>
                <view class="item" v-for="(item,index) in walletDetail" :key="item.create_time">
                    <view class="u-f"><view>明细：</view><view>{{item.type==1?"+":item.type==2?"-":"NULL"}}{{item.value}}</view></view>
                    <view class="u-f"><view>消息：</view><view>{{item.msg}}</view></view>
                    <view class="u-f"><view>时间：</view><view>{{item.create_time}}</view></view>
                </view>
            </view>
        </template>
        <template v-else>
           <u-empty text="暂时无数据" mode="data"></u-empty>
        </template>
	</view>
</template>

<script>
	export default {
        created(){
          // 获取明细
            this.$u.get('/get_user_wallet_details').then(res=>{
                this.walletDetail=res.data;
            })
        },
		data() {
			return {
				walletDetail:[]
			};
		}
	}
</script>

<style lang="scss">
.walletDetails{
    padding: 20rpx;
    .item{
        padding: 13rpx 23rpx;
        height: auto;
        border-radius: 10rpx;
        border: 1rpx solid #F1F1F1;
        font-size: 28rpx;
        justify-items: center;
        margin: 10rpx 0;
        view{
            // justify-content: space-between;
        }
    }
}
</style>
