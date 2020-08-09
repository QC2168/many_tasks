<template>
	<view class="sign">
		<view class="signImgBox u-f-ajc">
            <image src="../../static/images/sign/sign.png" mode="aspectFit"></image>
        </view>
        <view class="toSign u-f-ajc">
            <u-button :plain="signData.isSign===0?false:true" @tap="sign" size="medium" shape="circle" type="warning">{{signData.isSign===0?'一键签到':'已签到'}}</u-button>
        </view>
        <view v-if="signData.continued>1" class="data u-f-ajc">
            您已持续签到{{signData.continued}}天
        </view>

	</view>
</template>

<script>
	export default {
        created() {
            this.get_data();
        },
		data() {
			return {
				signData:[]
			};
		},
        methods:{
            sign(){
                this.$u.post('/sign').then(res=>{
                    // uni.showToast({
                    //     title:res.msg,
                    //     icon:res.msg==='签到成功'?'success':'none'
                    // })
                    if(res.data){
                       uni.showToast({
                        title:res.data,
                        icon:'none',
                        duration:2000
                    }) 
                     this.get_data();
                    }
                    
                })
            },
           async get_data(){
                await this.$u.post('/sign_data').then(res=>{
                    if(res.errorCode!==0)return;
                    this.signData=res.data
                })
            }
        }
	}
</script>

<style lang="scss" scoped>
.sign{
    background: #f8f8f8;
    height: 100vh;
    .signImgBox{
        width: 100%;
        height: 340rpx;
        padding-left: 20rpx;
        image{
            width: 270rpx;
            height: 270rpx;
        }
    }
    .toSign{
        width: 100%;
        height: 100rpx;
    }
    .data{
        margin: 30rpx auto;
        height: 140rpx;
        width: 85%;
        font-size: 40rpx;
        letter-spacing:5rpx;
        background-color: white;
        border-radius: 12rpx;
        box-shadow: 2rpx 2rpx 5rpx #cacaca;
        
       
    }
}
</style>
