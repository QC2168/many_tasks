<template>
<view class="box">
		<view v-if="stepList.length!==0" class="step" v-for="(item,index) in stepList" :key="index">
		    <view class="st">
		        <view class="index u-f-ajc">{{index+1}}</view>
		        <view class="text">{{item.text}}</view>
		    </view>
		    <view class="picBox">
		        <image class="pic" :src="URL+item.pic" mode="widthFix"></image>
		        <view class="tips u-f-ajc">
		            步骤图{{index+1}}
		        </view>
		    </view>
		</view>
</view>
</template>

<script>
	export default {
        created() {
            
        },
		data() {
			return {
				  URL:getApp().globalData.URL
			};
		},
        props:{
            stepList:{
                type:Array,
                default:[]
            }
        }
	}
</script>

<style lang="scss" scoped>
.box{
    .step{
        .st{
            display: inline-flex;
            width: 100%;
             .index{
                 margin: 0 20rpx;
            border-radius: 100%;
            background-color: #DD524D;
            color: white;
            height: 52rpx;
            width: 52rpx;
            font-size: 33rpx;
        }
        .text{
            line-height: 52rpx;
            width:80%;
            font-size: 33rpx;
            overflow: hidden; /*自动隐藏文字*/
            text-overflow: ellipsis;/*文字隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
        }
        }
       .picBox{
           margin: 20rpx 0 20rpx 30rpx;
            position: relative;
           .pic{
               border-radius: 15rpx;
        }
        .tips{
                width: 125rpx;
                height: 55rpx;
                font-size: 28rpx;
                border-top-right-radius: 15rpx;
                border-top-left-radius: 15rpx;
                border-bottom-right-radius: 15rpx;
                position: absolute;
                background-color: #DD524D;
                color: white;
                top: 0;
                left: 0;
                padding: 6rpx;
                
            }
       }
        
       
    }
}

</style>
