<template>
	<view class="taskDetail">
       <!-- <u-divider
        fontSize="30"
        height="60"
        >任务数据</u-divider> -->
        <lines>
              <template v-slot:center>
         任务数据
              </template>
        </lines>
	<view class="wrap" justify="around">
		<u-row gutter="16">
			<u-col span="6">
				<view class="demo-layout bg-purple u-f-ajc">佣金</view>
			</u-col>
			<u-col span="6">
				<view class="demo-layout bg-purple-light u-f-ajc">剩余名额</view>
			</u-col>
		<!-- 	<u-col span="4">
				<view class="demo-layout bg-purple-dark u-f-ajc">积分</view>
			</u-col> -->
		</u-row>
	    <u-row gutter="16">
	    	<u-col span="6">
	    		<view class="demo-layout bg-purple u-f-ajc">{{taskData.price}}</view>
	    	</u-col>
	    	<u-col span="6">
	    		<view class="demo-layout bg-purple-light u-f-ajc">{{taskData.remaining_quota}}</view>
	    	</u-col>
	   <!-- 	<u-col span="4">
	    		<view class="demo-layout bg-purple-dark u-f-ajc">暂时无</view>
	    	</u-col> -->
	    </u-row>
	</view>
    <!-- 任务简介 -->
<!--    <u-divider
    fontSize="30"
    height="60"
    >任务简介</u-divider> -->
    <lines>
          <template v-slot:center>
     任务简介
          </template>
    </lines>
    <view class="describe">
        <text>
        {{taskData.content}}
        </text>
    </view>
    <!-- 任务步骤 -->
    <lines>
          <template v-slot:center>
     任务步骤
          </template>
    </lines>
<!--    <u-divider
    fontSize="30"
    height="60"
    >如何完成任务？</u-divider> -->
    <view class="step" v-for="(item,index) in taskData.task_step_pic" :key="index">
        <view class="one u-f-ajc">任务操作步骤{{index+1}}</view>
        <view class="two u-f-ajc">{{item.text}}</view>
        <view class="three u-f-ajc"><image :src="URL+item.pic" mode="widthFix"></image></view>
    </view>
    <!-- 报名任务 -->
    <view @tap="post(task_id)" class="signUp u-f-ajc">
        <view class="u-f-ajc">报名该任务</view>
       
    </view>
	</view>
</template>

<script>
        import lines from '@/components/common/lines/lines'
	export default {
         onLoad:function (option) { //option为object类型，会序列化上个页面传递的参数
     this.getData(option.task_id)
     this.task_id=option.task_id;
            },
            created(){
    
            },
            components:{
                  lines
            },
		data() {
			return {
                URL:getApp().globalData.URL,
				task_id:null,
                taskData:[],
			};
		},
        methods:{
            // 请求详细数据
            async getData(task_id){
                await this.$u.get('get_task_detail',{task_id}).then(res=>{
                this.taskData=res.data;
                uni.setNavigationBarTitle({
                    title:res.data.title
                });}
                )
                
            },
            async post(task_id){
               await this.$u.post('/create_task_order',{task_id}).then(res=>{
                    uni.showToast({
                        title:res.msg
                    })
                })
            }
        }
	}
</script>

<style lang="scss" scoped>
    .taskDetail{
                padding-bottom: 105rpx;
        .wrap {
        	padding: 24rpx;
            font-size: 28rpx;
        }
        .describe{
            padding: 5rpx 50rpx;
            text-align: justify;
             font-size: 32rpx;
        }
        .step{
            margin:10rpx 0 20rpx 0;
            .one{
                margin: 10rpx 0;
                color: #007AFF;
                
            }
            .two{
                margin:10rpx 0;
                text-align: justify;
                padding: 5rpx 40rpx;
                 font-size: 32rpx;
                }
            .three{
                image{
                    border-radius: 10rpx;
                    width: 500rpx;
                    border: 1rpx solid #eeeeee;
                    box-shadow: 5rpx 5rpx 5rpx #eeeeee;
                }
            }
        }
        .signUp {
        height: 88rpx;
        width: 100%;
        background-color: #f5f5f5;
        position: fixed;
        bottom: 0;
        left: 0;
        color: white;
        font-size: 30rpx;
        font-family: Sans-serif;
        font-weight: bold;
        letter-spacing:10rpx;
        z-index: 999;
        view{
            background-color: #007AFF;
            width: 600rpx;
            height: 60rpx;
            border-radius: 30rpx;
        }
        }

    }

</style>
