<template>
	<view class="team">
       <view class="imageBox u-f-ajc">
            <image src="../../static/images/team/share.png" mode="aspectFill"></image>
        </view>
   <!--     <view class="myCode u-f-ajc">我的邀请码:{{team.code}}</view>
		<view class="myTeamData u-f">
            <view class="u-f-column">
                <view>我的团队</view>
                <view>{{team.count}}</view>
            </view>
        </view> -->
        <u-row gutter="16" justify="around">
        	<u-col span="6">
        		<view class="dataTitle u-f-ajc">我的团队</view>
        	</u-col>
        	<u-col span="6">
        		<view @tap="copyCode" class="dataTitle u-f-ajc">我的邀请码</view>
        	</u-col>
        </u-row>
        <u-row gutter="16" justify="around">
        	<u-col span="6">
        		<view class="dataValue u-f-ajc">{{team.count}}</view>
        	</u-col>
        	<u-col span="6">
        		<view @tap="copyCode" class="dataValue u-f-ajc">{{team.code}}</view>
        	</u-col>
        </u-row>
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
    import h5Copy from '@/common/h5Copy.js'
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
                },
                copyCode(){
                    // #ifndef H5
                    uni.setClipboardData({
                        data: this.team.code,
                        success: function () {
                            uni.showToast({
                                title:"复制邀请码成功!",
                                icon:"none"
                            })
                        }
                    }); 
                    // #endif
                    // #ifdef H5
                  const result = h5Copy(this.team.code)
                        if (result === false) {
                          uni.showToast({
                            title:'该浏览器不支持复制功能',
                          })
                        } else {
                          uni.showToast({
                            title:'复制邀请码成功!',
                            icon:'none'
                          })
                        }
                    // #endif
                  
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
    .dataTitle{
        font-size: 33rpx;
        font-weight: bold;
    
    }
    .dataValue{
        margin: 8rpx 0;
        font-size: 26rpx;
        font-weight: bold;
        
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
