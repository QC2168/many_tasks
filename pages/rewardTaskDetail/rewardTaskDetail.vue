<template>
	<view class="taskDetail" v-if="rewardTaskData.length!==0">
        <u-divider
        fontSize="30"
        height="60"
        >任务数据</u-divider>
        <view class="info">
            <view>
                <view>任务平台类型</view>
                <view>{{rewardTaskData.reward_goods_platform_type}}</view>
            </view>
            <view>
                <view>任务体验类型</view>
                <view>{{rewardTaskData.reward_goods_type}}</view>
            </view>
            <view>
                <view>搜索关键词</view>
                <view>{{rewardTaskData.keyword}}</view>
            </view>
            <view>
                <view>商品一键下单</view>
                <view>{{rewardTaskData.is_btn?"支持":"不支持"}}</view>
            </view>
        </view>
	<view class="wrap" justify="around">
		<u-row gutter="16">
			<u-col span="4">
				<view class="demo-layout bg-purple u-f-ajc">下单价格</view>
			</u-col>
			<u-col span="4">
				<view class="demo-layout bg-purple-light u-f-ajc">剩余名额</view>
			</u-col>
			<u-col span="4">
				<view class="demo-layout bg-purple-dark u-f-ajc">佣金</view>
			</u-col>
		</u-row>
	    <u-row gutter="16">
	    	<u-col span="4">
	    		<view class="demo-layout bg-purple u-f-ajc">{{rewardTaskData.price}}</view>
	    	</u-col>
	    	<u-col span="4">
	    		<view class="demo-layout bg-purple-light u-f-ajc">{{rewardTaskData.remaining_quota}}</view>
	    	</u-col>
	    	<u-col span="4">
	    		<view class="demo-layout bg-purple-dark u-f-ajc">{{rewardTaskData.money_reward}}</view>
	    	</u-col>
	    </u-row>
	</view>
    <!-- #ifdef APP-PLUS -->
    <view v-if="rewardTaskData.is_btn==1" class="u-f-ajc" style="height: 80rpx;">
        <u-button size="mini" @tap="toGoddsDetail">一键跳转到商品页面</u-button>
    </view>
    <!-- #endif -->
    <!-- 任务简介 -->
    <u-divider
    fontSize="30"
    height="60"
    >任务简介</u-divider>
    <view class="describe">
        <text>
        {{rewardTaskData.content}}
        </text>
    </view>
    
    <!-- 任务步骤 -->
    <u-divider
    fontSize="30"
    height="60"
    >如何完成任务？</u-divider>
    <view class="step" v-for="(item,index) in rewardTaskData.task_step_pic" :key="index">
        <view class="one u-f-ajc">任务操作步骤{{index+1}}</view>
        <view class="two u-f-ajc">{{item.text}}</view>
        <view class="three u-f-ajc"><image :src="URL+item.pic" mode="widthFix"></image></view>
    </view>

    <!-- 报名任务 -->
    <view @tap="post(reward_task_id)" class="signUp u-f-ajc">
        报名该任务
    </view>
	</view>
</template>

<script>
	export default {
         onLoad:function (option) { //option为object类型，会序列化上个页面传递的参数
     this.getData(option.reward_task_id)
     this.reward_task_id=option.reward_task_id;
            },
            created(){
    
            },
		data() {
			return {
                URL:getApp().globalData.URL,
				reward_task_id:null,
                rewardTaskData:[],
			};
		},
        methods:{
            // 请求详细数据
            async getData(reward_task_id){
                await this.$u.get('get_reward_task_detail',{reward_task_id}).then(res=>{
                    this.rewardTaskData=res.data
                    uni.setNavigationBarTitle({
                        title:res.data.title
                    });
                    })
            },
            async post(reward_task_id){
               await this.$u.post('/create_reward_task_order',{reward_task_id}).then(res=>{
                    uni.showToast({
                        title:res.msg
                    })
                })
            },
            toGoddsDetail(){
                plus.runtime.openURL(this.rewardTaskData.goods_url, (res) =>{
                    uni.showModal({
                        title:"警告",
                        content:'跳转被阻止！请允许',
                        showCancel:false,
                        confirmText:"已读"
                    })
                    this.showCopyBtn=true;
                });
            }
        }
	}
</script>

<style lang="scss" scoped>
    .taskDetail{
        .info{
            view{
             height: 70rpx;   
             display: flex;
             justify-content: space-between;
             padding: 0 20rpx;
            }
        }
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
        .signUp{
           height: 80rpx;
           width: 100%;
           background-color: #007AFF;
           position: fixed;
           bottom: 0;
           left: 0;
           color: white;
           font-size: 30rpx;
           font-family: Sans-serif;
           font-weight: bold;
           letter-spacing:10rpx;
           z-index: 999;
        }
    }

</style>
