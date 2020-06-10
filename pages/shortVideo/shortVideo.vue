<template>
	<view>
		<button type="default" @tap="showVideo">开启</button>
	</view>
</template>

<script>
         let rewardedVideoAd = null;
	export default {
        onReady() {
                    if(uni.createRewardedVideoAd) {
                        rewardedVideoAd = uni.createRewardedVideoAd({ adpid: '__UNI__43907E6' })
                        rewardedVideoAd.onLoad(() => {
                              console.log('激励视频 广告加载成功')
                            console.log('onLoad event')
                        })
                        rewardedVideoAd.onError((err) => {
                            console.log('onError event', err)
                        })
                        rewardedVideoAd.onClose((res) => {
                            console.log('onClose event', res)
                        })
                    }
                },
		data() {
			return {
				 title: 'createRewardedVideoAd'
			};
		},
        methods:{
            showvideo(){
                rewardedVideoAd.show()
            }
        }
	}
</script>

<style lang="scss">

</style>
