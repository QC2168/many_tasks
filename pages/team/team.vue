<template>
	<view class="team">
       <view class="imageBox u-f-ajc">
            <image src="../../static/images/team/share.png" mode="aspectFill"></image>
        </view>
        <u-row gutter="16" justify="around">
        	<u-col span="6">
        		<view class="dataTitle u-f-ajc">我的团队</view>
        	</u-col>
        	<u-col span="6">
        		<view @tap="copyCode" @longtap="copyCode" class="dataTitle u-f-ajc">我的邀请码</view>
        	</u-col>
        </u-row>
        <u-row gutter="16" justify="around">
        	<u-col span="6">
        		<view class="dataValue u-f-ajc">{{team.count}}</view>
        	</u-col>
        	<u-col span="6">
        		<view @tap="copyCode" @longtap="copyCode" class="dataValue u-f-ajc">{{team.code}}</view>
        	</u-col>
        </u-row>
        <u-divider fontSize="32" half-width="250" height="90">我的团队</u-divider>
           <!-- <template v-if="team.list"> -->
                
        <scroll-view scroll-y :style="{height:navHeight+'px'}" id="scroll" class="scroll-Y list">
           
              <view class="item u-f" v-for="(item,index) in team.list" :key="item.create_time">
        
                   <view>{{item.username}}</view>
                   <view>{{item.create_time}}</view>
                  
               </view>

        </scroll-view>
<!-- </template> -->
   <!--     <template v-else>
          <u-empty text="暂时没有下级哦" mode="history"></u-empty>
        </template> -->
	</view>
</template>

<script>
    import h5Copy from '@/common/h5Copy.js'
	export default {
        created() {
            this.getData()
        },
		data() {
			return {
				team:[],
                pH:0,
                navHeight:0,
                URL:getApp().globalData.URL,
			};
		},
        methods:{
            async getData(){
                await this.$u.get('get_team').then(res=>{
                    this.team=res.data
                 this.setScrollHeight()
                    })
               
                },
                copyCode(){
                    // #ifndef H5
                    uni.setClipboardData({
                        data: 'http://www.taskarea.top/pages/register/register?INC='+this.team.code,
                        success: function () {
                            uni.showToast({
                                title:"复制邀请链接成功",
                                icon:"none"
                            })
                        }
                    }); 
                    // #endif
                    // #ifdef H5
                  const result = h5Copy(window.location.host+'/pages/register/register?INC='+this.team.code);
                        if (result === false) {
                          uni.showToast({
                            title:'该浏览器不支持复制功能',
                          })
                        } else {
                          uni.showToast({
                            title:'复制邀请链接成功',
                            icon:'none'
                          })
                        }
                    // #endif
                  
                },
                setScrollHeight(){
                    if(!this.team.list)return;
                    uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
                        success: (res) => { //成功回调函数
                            this.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
                           let titleH = uni.createSelectorQuery().in(this).select("#scroll"); //想要获取高度的元素名（class/id）
                            titleH.boundingClientRect(data => {
                                let pH = this.pH;
                                this.navHeight = pH - data.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
                                console.log(this.navHeight);
                            }).exec()
                        }
                    })
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
