<template>
	<view :style="'height:'+view_height+'px'" class="news">
		<!-- model -->
        <view v-for="(item,index) in list" :key="index" class="card animated pulse">
            <view class="title">{{item.title}}</view>
            <view class="content">{{item.content}}</view>
            <view class="create_time">发布时间：{{item.create_time}}</view>
        </view>
	</view>
</template>

<script>
	export default {
        onPullDownRefresh() {
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
                    this.list=res.data
                    uni.stopPullDownRefresh()
                })
            }
        }
	}
</script>

<style lang="scss" scoped>
.news{
    background-color: #e6e6e6;

    width: 100%;
    height: 100vh;
    padding: 28rpx 0;
 .card{
     width: 90%;
     background-color: white;
     border-radius: 15rpx;
     box-shadow: 5rpx 5rpx 5rpx #EEEEEE;
     padding:10rpx 20rpx;
       margin: 0 auto 30rpx auto;
     .title{
         margin: 10rpx 0;
         font-size: 34rpx;
         text-align: center;
         margin-bottom: 10rpx;
     }
     .content{
         font-size: 26rpx;
         text-align: justify;
         
     }
     .create_time{
         font-size: 20rpx;
         text-align: center;
         color: grey;
         margin: 18rpx 0;
     }
 }   
}
</style>
