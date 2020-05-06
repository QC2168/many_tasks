<template>
	<view class="team">
       <view class="imageBox u-f-ajc">
            <image src="../../static/images/team/share.png" mode="aspectFill"></image>
        </view>
		<view class="myTeamData u-f">
            <view class="u-f-column">
                <view>我的团队</view>
                <view>{{team.count}}</view>
            </view>
            <view class="u-f-column">
                <view>预计最大赏金</view>
                <view>{{team.reward}}</view>
            </view>
        </view>
        <u-divider fontSize="32" half-width="250" height="90">我的团队</u-divider>

        <scroll-view scroll-y class="list">
           
              <view class="item u-f" v-for="(item,index) in team.list" :key="index">
        
                   <view>{{item.username}}</view>
                   <view>{{item.create_time}}</view>
                  
               </view>

        </scroll-view>

        <!-- <template v-else>
          <u-empty text="暂时没有下级哦" mode="history"></u-empty>
        </template> -->
	</view>
</template>

<script>
	export default {
        created() {
            this.getData()
            uni.getSystemInfo({
                success(res) {
                  this.listHeight=res.windowHeight-300;
                }
            })
        },
		data() {
			return {
				team:[],
                listHeight:540
			};
		},
        methods:{
            async getData(){
                await this.$u.get('get_team').then(res=>this.team=res.data)
                }
        }
	}
</script>

<style lang="scss" scoped>
.team{
    .imageBox{
        width: 100%;
        height: 500rpx;
    }
    .myTeamData{
        height: 100rpx;
        view{
            flex:1;
            view{
                  display: flex;
                justify-content: center;

            }
            view:first-child{
                font-size: 32rpx;
                font-weight: bold;
                margin: 5rpx 0;
            }
            view:last-child{
                font-size: 28rpx;
            }
            
            
        }
    }
    .list{
       .item{
           padding: 0 30rpx;
           align-items: center;
           justify-content: space-between;
            height: 70rpx;
            border-bottom-left-radius: 20rpx;
            border-bottom-right-radius: 20rpx;
            border-bottom: 1rpx solid #eeeeee;
            box-shadow: 5rpx 5rpx 5rpx #EEEEEE;
        }
    }
}
</style>
