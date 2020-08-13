<template>
	<view :style="'height:'+view_height+'px'" class="news">
		<!-- model -->
        <view v-for="(item,index) in list" :key="index" class="card animated fadeInUp">
            <view class="title">{{item.title}}</view>
            <view v-html="item.content" class="content"></view>
            <view class="create_time">{{item.create_time}}</view>
        </view>
	</view>
</template>

<script>
	export default {
        onPullDownRefresh() {
            // #ifdef  APP-PLUS
            plus.nativeUI.toast("正在刷新数据...");
            // #endif
            this.getData()
        },
        created(){
            this.getData();
            uni.getSystemInfo({
                success:(res)=>{
                    this.view_height=res.windowHeight;
                }
            })
        },
		data() {
			return {
				list:[],
                view_height:0
			};
		},
        methods:{
            async getData(){
               await this.$u.get('/get_news').then(res=>{
                    let listData=res.data;
                 this.list=_.orderBy(listData,['create_time'], ['desc'])
                    uni.stopPullDownRefresh()
                })
            }
        }
	}
</script>

<style lang="scss" scoped>
.news{
    background-color: #f5f5f5;

    width: 100%;
    height: 100vh;
    padding: 28rpx 0;
 .card{
     width: 90%;
     background-color: white;
     border-radius: 15rpx;
     box-shadow: 2rpx 2rpx 10rpx #EEEEEE;
     padding:10rpx 20rpx;
       margin: 0 auto 35rpx auto;
     .title{
         margin: 12rpx 0 38rpx 0;
         font-size: 36rpx;
         text-align: center;
     }
     .content{
         font-size: 26rpx;
         text-align: justify;
     }
     .create_time{
         font-size: 20rpx;
         text-align: right;
         color: grey;
         margin: 45rpx 0 10rpx 0;
         padding: 0 10rpx 0 0;
     }
 }   
}
</style>
