<template>
	<view>
		<button type="default" @tap="rewardedVideoAd.show()">开启</button>
	</view>
</template>

<script>
         let rewardedVideoAd = null;
	export default {
        onReady() {
                    if(uni.createRewardedVideoAd) {
                        rewardedVideoAd = uni.createRewardedVideoAd({ adpid: 'xxxx' })
                        rewardedVideoAd.onLoad(() => {
                          
                        })
                        rewardedVideoAd.onError((err) => {
                           
                        })
                        rewardedVideoAd.onClose((res) => {
                           
                        })
                    }
                },
		data() {
			return {
				 title: 'createRewardedVideoAd'
			};
		},
	}
</script>

<style lang="scss">

</style>
