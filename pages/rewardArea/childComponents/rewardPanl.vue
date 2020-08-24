<template>
    <view class="rewardPanl animated fadeInUp" @tap="toHbDetail">
        <view class="userinfo u-f-ac">
            <image class="userPic" :src="URL+item.user.user_pic" mode="scaleToFill"></image>
            <view class="username">{{item.username}}</view>
    
            <view class="rewardIconBox">
                <image class="rewardIcon" src="../../../static/images/rewardArea/hongbao.png" mode="aspectFill"></image>
    
            </view>
            <view class="tag">
                <u-tag v-if="item.priority>=1" :text="'置顶'" shape="circle" mode="dark" type="error" size="mini" />
                <u-tag :text="' '+item.tag+' '" shape="circle" mode="dark" type="error" size="mini" />
            </view>
        </view>
        <view class="content">
            {{item.content}}
        </view>
        <view class="miniImages" v-if="Object.keys(item.hb_area_pic).length!==0">
            <image v-for="(item,index) in item.hb_area_pic" :key="item.pic" class="img" :src="URL+item.pic" mode="scaleToFill"></image>
        </view>
        <view class="bottom u-f-ac">
            <view class="count">
                {{item.hb_area_comment_list.length}}
            </view>
            <u-icon name="pinglun" custom-prefix="custom-icon" size="45" color="#888888"></u-icon>
    
        </view>
        <!-- <space bgColor="#f4f4f5" size="3"></space> -->
    </view>
</template>

<script>
    export default {
        data(){
            return{
                        URL: getApp().globalData.URL,
            }
        },
        methods:{
            toHbDetail(){
               uni.$emit('toHbDetail',{'hb_id':this.item.hb_id})
            }
        },
        props:{
            item:{
                type:Array|Object,
                default: {}
            }
        }
    }
</script>

<style lang="less" scoped>
    .rewardPanl {
        width: 94%;
        padding: 10rpx 25rpx;
        margin: 5rpx auto 14px auto;
        border-radius: 20rpx;
        border: .5rpx solid #EEEEEE;
        box-shadow: 4rpx 3rpx 6rpx #EEEEEE;
        .userinfo {
            height: 110rpx;
    
            .userPic {
                width: 67rpx;
                height: 67rpx;
                border-radius: 100%;
                border: 1rpx solid #C8C7CC;
                margin: 0 10px 0 10rpx;
            }
    
            .username {
                // margin: 0 20rpx 0 0;
                font-size: 32rpx;
            }
    
            .tag {
                margin: 0 0 0 10rpx;
                view{
                    margin: 0 10rpx 0 0;
                }
            }
    
            .rewardIconBox {
                margin: 0 0 0 10rpx;
    
                .rewardIcon {
                    width: 60rpx;
                    height: 60rpx;
                }
            }
        }
    
        .content {
            // letter-spacing:1rpx;
            text-align: justify;
        }
    
        .miniImages {
            margin: 13rpx 0;
    
            .img {
                width: 195rpx;
                height: 195rpx;
                margin: 0 10rpx;
                border-radius: 13rpx;
            }
        }
    
        .bottom {
            flex-direction: row-reverse;
    
            view {
                margin: 0 10rpx;
            }
    
            height: 90rpx;
    
        }
    }
</style>
